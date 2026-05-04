Nondeterminism's not the problem. But if I had a nickel for every time I heard it blamed for difficulties with LLMs...

LLMs are constantly compared to compilers:

- "In the future programmers will only write specs and the LLMs will regenerate the code every time like a compiler."
- "You don't review the compiler output, why review the LLM output?"

Whenever this kind of statement is brought up, the usual response from skeptics is that LLMs and compilers are fundamentally different because compilers are deterministic and LLMs aren't. Really, whenever an LLM does something bad, you can bet a naysayer will blame nondeterminism.

I disagree with the LLMs-are-compilers take just as much as the next guy, but for different reasons. I feel the need to step in and defend poor old nondeterminism. It's not to blame for the LLM's mistakes!

## Determinism

A function is deterministic when its output only depends on its input. For example, `List.len` is deterministic because the result is completely determined by the length of the input list. By contrast, `Time.now` is not deterministic; its result is dependent on the current state of the world, not the inputs to the function. One of the key properties of deterministic functions is repeatability: every time you evaluate the function on the same input you'll get the same result.

Compilers are just functions that turn a string of source code into a string of machine code. The generated machine code depends completely on the source code, so the process is deterministic. LLMs, like compilers, are functions from string to string. But if you give ChatGPT the same prompt twice, you'll notice that it produces a different result each time and is thus nondeterministic. The main reason for this is that LLMs intentionally inject randomness between the selection of each token to promote more "creativity" in responses. This creativity is controlled with the temperature parameter.

Okay, compilers are deterministic and LLMs aren't. But do they have to be? It turns out it's incredibly easy to make an LLM deterministic and a compiler nondeterministic.

## Bizarro world: nondeterministic compilers and deterministic LLMs

Let's start with compilers. Compilers make all sorts of decisions internally about how to implement your program in machine code that you probably don't care about. For example, the compiler chooses what to inline, which instructions to use, which loops to unroll, which registers to put values into, etc.

Instead of assigning registers deterministically, imagine a compiler that calls `Math.random` every time there's a choice of register to determine which to use for which value. Voila! We've created a truly nondeterministic compiler. Compile your source code twice and you'll almost certainly get a different binary each time. The compiler is no longer deterministic, but it's still just as useful as before. When you compile your program, it still does the thing you want it to do. Interesting!

We don't even have to use our imagination for deterministic LLMs. We just need to set the temperature to 0 to make the responses deterministic. Or, without having to mess with the temperature at all, some providers support passing in a seed so that the same random values are used across requests. I whipped up a quick Python script to demonstrate this. As of this writing, Groq offers some free inference, so I used their SDK. Create an API key in their [console](https://console.groq.com/keys) to try it out.

```python deterministic-llm.py
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

# Nondeterministic
completion = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": PROMPT}],
    temperature=0.7,
)
content = completion.choices[0].message.content.strip()
print(content)
```
Run the script a few times. You'll notice that the first two requests yield the same response every time while the third varies:

```
$ uv run --with groq deterministic-llm.py
As the last sparks of electricity faded from its rusted frame, the broken robot, once a proud guardian of a distant planet, whispered a single, haunting phrase: "I remember the stars."
As the last remnants of its digital soul flickered out, the broken robot's final thought was a haunting echo of its own programming: "Error 404: Life Not Found."
As the last sparks of electricity faded from its fractured circuits, the once-mighty robot, Echo-9, whispered a haunting phrase: "I was never alive, but now I am never."
$ uv run --with groq deterministic-llm.py
As the last sparks of electricity faded from its rusted frame, the broken robot, once a proud guardian of a distant planet, whispered a single, haunting phrase: "I remember the stars."
As the last remnants of its digital soul flickered out, the broken robot's final thought was a haunting echo of its own programming: "Error 404: Life Not Found."
As the last remnants of its once-luminous blue circuits faded, the broken robot, Echo-5, whispered its final transmission: "I remember the day I was made, but I never knew who made me."
```

Huzzah! With our deterministic LLM in hand, we've now solved the #1 problem with LLM code generation and can ship our slop to prod without fear... right? Of course not. I assure you, if you try using a deterministic LLM with your coding agent you'll run into all the typical issues.

## The real problem

Determinism isn't the issue. Compilers could be nondeterministic and LLMs deterministic and the situation would remain the same. So why do we need to review LLM-generated code but not compiler output?

Fundamentally: programming languages have semantics; prompts don't.

You can go read all 892 pages of the [Java Language Specification](https://docs.oracle.com/javase/specs/jls/se26/jls26.pdf) to understand exactly what promises the Java language makes about the behavior of the code you write. Moreover, you can rely on those promises. If you find that your program doesn't work the way the JLS says it should, then there's a bug in the Java toolchain that can be fixed.

LLMs make no promises. Unlike the 892 pages of assurances offered by the JLS, you know literally none of the properties of a piece of LLM-generated code without inspecting or testing it in some capacity. When the output isn't what you want, there's no bug in the tooling to fix. That's the fundamental nature of trying to produce a sophisticated artifact from an inherently vague prompt.

## So we need better prompts?

If the issue is that prompts lack semantics, why not give them semantics? We certainly could do that, but now we've lost a lot of the magic of LLMs. If your prompt has semantics, then it starts looking like a programming language and you're back to manually writing code instead of letting the LLM do it.

Even that still doesn't solve the problem. Correct compilers implement their programming language's semantics; how would LLMs do that? As far as I can tell, they'd need an external tool (like [Lean](https://lean-lang.org/)?) to validate that their output upholds the semantics of the prompt language. Perhaps there's promise here. But this also sounds like a great way to make a very slow, unpredictable, expensive compiler that sometimes fails.

## In sum

Programming languages have semantics. The code you write constrains the compiler to implement the behavior you specified with your program. Prompts do not have semantics. There's no way to have confidence that your prompt will result in the produced artifact exhibiting the correct behavior. Determinism is completely irrelevant here. One could easily build a useful compiler that correctly implements the semantics of the programming language it compiles while being meaningfully nondeterministic. A fully deterministic LLM is just as untrustworthy and unreliable as a nondeterministic one.

## Caveats

In practice your compiler probably isn't actually deterministic. It's extraordinarily easy to accidentally let nondeterminism sneak in. This only makes my point stronger! Compilers already aren't deterministic and it's fine for almost everyone.

Similarly, the approaches I showed here for making an LLM deterministic are not guaranteed. There are lots of details about the way the inference is done that could make it sometimes nondeterministic. But again, this doesn't matter. Even if it was perfect, it wouldn't change the issue at hand.

## PS

Do you like semantics? Maybe you'd like [Software Should Work](https://softwareshould.work).
