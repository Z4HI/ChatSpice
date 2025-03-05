from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer, pipeline
from fastapi import FastAPI
from pydantic import BaseModel
import torch
print(torch.cuda.is_available())
import re

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
    clothing: str
    temperature: float = 1.0  # Default temperature value
    repetition_penalty: float = 1.0
    max_length: int = 1024
    max_new_tokens: int = 200
@app.get("/")
def read_root():
    return {"Hello": "World"}
# Endpoint for generating text based on the provided prompt
@app.post("/generate")
def generate_text(request: PromptRequest):
    charName = request.charName
    chatHistory = request.chatHistory
    scenario = request.scenario
    gender = request.gender
    body = request.body
    clothing = request.clothing
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
    clothing: {clothing}
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
    strippedText = generated_text.split("<|model|>", 1)[-1].strip()
    # Step 1: Split the text at punctuation marks (!, ?, .), keeping the punctuation as part of the text
    split_text = re.split(r'([.!?])', strippedText)
    
    # Step 2: Combine the split text back into a list where each element is a complete sentence or action
    segments = [split_text[i] + split_text[i+1] if i+1 < len(split_text) else split_text[i]
                for i in range(0, len(split_text), 2)]
    
    # Step 3: If the last segment doesn't end with valid punctuation, remove it
    if segments and not (segments[-1].endswith((',', '.', '?', '*')) or segments[-1].endswith('...')):
        segments.pop()
    output = " ".join(segments)

    return output