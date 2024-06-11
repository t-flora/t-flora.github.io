---
title: "The value of bare-metal knowledge"
description: "Understanding all layers of the compute stack is extremeley rewarding. It will bring you benefits regardless of the development layer you work in."
publishDate: "22 May 2023"
# updatedDate: "14 August 2023"
# coverImage:
#   src: "./cover.png"
#   alt: "Astro build wallpaper"
tags: ["opinion", "low-level"]
---

Do you know how CPUs work? 

Do you really, _really_ know how CPUs work? An embedded software engineer, nevermind a hardware engineer, will answer "yes." But if you, like me, got started in your software journey with high-level languages and data science, that is much less likely. What are we missing when the core of computer architectures are not part of the standard CS education of so many engineer types?

You obviously don't need to know the details of x86 or ARM architectures if all your projects require only TypeScript or Python code for tasks that can be performed in a few hundred milliseconds without harm to the user experience. But there is a key difference between writing high- and low-level code: mastery of abstraction.

## "Turtles all the way down"
Digital marvels come from very simple components, cleverly put together to bring you universal computation, very often consumed as short videos, ads, and streaming services. 

From NAND gates that can be used to represent any propositional logic function, to single-bit chips that perform boolean arithmetic, to registers and multi-bit operators, to ALUs and sequential chips, to memory and CPUs and I/O devices, to finally reach a modern computer using the von Neumann architecture. These are terribly basic concepts to those with an actual education in computer architecture, but to many developers today there might be lots of word in the previous sentence about which they are not super confident in their understanding. But look at that: to get to the most basic thing that would be recognized as a computer today, you need some 6 layers of abstraction. Turtles on top of turtles. And we have not even reached software, properly speaking! No assembler, no compilers, no VMs, no operating system kernels. You can see how deep the turtles go.

## Harder = better, faster, stronger
I could do the typical exercise of evaluating a minimum "Hello World" program in different languages, but that's been done much better than I could by [Context Free](https://www.youtube.com/watch?v=dRhLRvOZEXA) and others ad infinitum before.

Instead, my point is simple: being forced to think about more abstractions to get minimum working software products makes you a better engineer. That much is intuitive; doing more and harder math exercises gives you practice and you become better at math, or anything else. But many seem to think that this training and practice _is not worth it_. I disagree with that sentiment in most cases.

If you are at the tail end of your career, it might not be worth it to dedicate tens to hundreds of hours mastering and practicing low-level concepts. But I suspect that people on the tail end of their software careers have mostly done this already; there weren't that many alternatives a couple of decades ago. If you are only a few years in, the boost to your logic reasoning and understanding of systems and abstractions is definitely worth your time. It is harder, but it will increase the cognitive load you can carry while writing software and developing solutions to your novel problems.

## GPT models and the advantage of expert generalists
Finally, the inevitable programmer-bingo-worthy mention of how the popularization of LLMs makes this all more critical.

Being able to organize the many layers of an architecture you are building in your head is a very valuable skill today, and will remain so. Being able to describe what you want with clear language is vital for a productive use of LLMs. Knowing the exact reserved keywords for a programming language, much less so.

If you can reason at a sufficient level of understanding about all the components of your system, you can leverage the knowledge LLMs have to turn you into a _true_ full-stack developer: from the metal to the cloud. Expertise in each layer will keep its value for a few years to come in all likelihood, but software generalists seem likely to become more valuable. Do not take "generalist" to mean "amateur": you better know your stuff. If you do, you will have an army of artificial brains to help you figure out the exact details.