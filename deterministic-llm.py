import os
from groq import Groq

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)
MODEL = "llama-3.1-8b-instant"
PROMPT = "Write a 1-sentence sci-fi story about a broken robot."

# Deterministic: temperature 0
completion = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": PROMPT}],
    temperature=0,
)
content = completion.choices[0].message.content.strip()
print(content)

# Deterministic: seed
completion = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": PROMPT}],
    temperature=0.7,
    seed=42,
)
content = completion.choices[0].message.content.strip()
print(content)
#
# Nondeterministic
completion = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": PROMPT}],
    temperature=0.7,
)
content = completion.choices[0].message.content.strip()
print(content)
