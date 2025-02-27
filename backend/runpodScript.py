from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer, pipeline
from fastapi import FastAPI
from pydantic import BaseModel
import torch
print(torch.cuda.is_available())


app = FastAPI()

model_name_or_path = "TheBloke/Mythalion-13B-AWQ"

# Load model
model = AutoAWQForCausalLM.from_quantized(
    model_name_or_path,
    fuse_layers=True,
    trust_remote_code=False,
    safetensors=True
).to("cuda")

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, trust_remote_code=False)

# Create a pipeline for text generation
pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.7,
    top_p=0.95,
    top_k=40,
    repetition_penalty=1.1
)

class PromptRequest(BaseModel):
    charName:str
    scenario: str
    chatHistory: list  # List of previous messages
    gender: str
    body: str
    personality: str
    temperature: float = 1.0  # Default temperature value
    repetition_penalty: float = 1.0
    max_length: int = 1024
    max_new_tokens: int = 200

# Endpoint for generating text based on the provided prompt
@app.post("/generate")
def generate_text(request: PromptRequest):
    charName = request.charName
    chatHistory = request.chatHistory
    scenario = request.scenario
    gender = request.gender
    body = request.body
    personality = request.personality
    temperature = request.temperature
    repetition_penalty = request.repetition_penalty
    max_length = request.max_length
    max_new_tokens = request.max_new_tokens

    prompt_template = f'''
    <|system|>Enter RP mode. Pretend to be a {charName}.
     Scenario: {scenario}
    Gender: {gender}
    Body description: {body}
    Personality traits: {personality}

    You shall reply to the user while staying in character and generate long responses. Use the chat hi>
    Chat History:{chatHistory}
    You shall reply to the user while staying in character, and generate long responses.
    <|model|>
    '''

    # Construct conversation history
    conversation = prompt_template
    for message in chatHistory:
        conversation += f'{message["role"]}: {message["content"]}\n'


   # Generate the text using the pipeline
    result = pipe(
        prompt_template,
        temperature=temperature,
        max_length=max_length,
        max_new_tokens=max_new_tokens,
        repetition_penalty=repetition_penalty
    )

    # Extract and clean the generated text
    generated_text = result[0]['generated_text'].strip()
    response_text = generated_text.split("<|model|>", 1)[-1].strip() if "<|model|>" in generated_text e>

    return {response_text}