---
locale: en
translationKey: 20261007-trust-ladder-software-kitchen
title: 'The Trust Ladder and the Software Kitchen: What Lies Behind 2,500 PRs in a Month'
date: 2026-10-07
lastMod: 2026-10-07
summary: 'From a single AI coding agent to automated delivery: how verification, environmental constraints, and task loops support development at scale.'
category: AI Coding
tags: [AI, agent, software engineering, development workflow]
comments: false
draft: false
---

> Translated by GPT-6 Luna.

# The Trust Ladder and the Software Kitchen: What Lies Behind 2,500 PRs in a Month

_A methodological breakdown of an interview with Potato, creator of pstack_

> **Source video**  
> Channel: 山人自有GoodIdea (Bilibili)  
> Duration: 65 minutes, 36 seconds  
> Link: <https://www.bilibili.com/video/BV1AjH66gETc>

Editorial note: This article uses the [lecture-to-notes](https://github.com/ysyecust/lecture-to-notes) project to extract the audio and turn it into written notes.

---

## Contents

1. What question does this conversation answer?
2. Why a Michelin kitchen is a better metaphor than a software factory
3. Verification: the one skill that lets you remove yourself from the loop
4. Hand off the deterministic work
5. The environment as a constraint: make errors impossible
6. Two loops: how machines receive work on their own
7. What the 2,500 PRs actually consisted of
8. Boundaries: one-way doors, verifiability, and the “dark factory”
9. What exactly is a skill?
10. Summary and open questions

---

## 1. What question does this conversation answer?

An engineer known as Potato submitted 2,500 pull requests to production in one month and turned the process into a talk. The talk received about three million views on X. Roughly ten days later, the host Matt sat down with him and questioned him point by point. Both are known for writing AI coding skills, so the conversation was less about sharing tips than about unpacking and comparing a complete way of working.

By the end, readers should be able to answer one question: what steps must you pass through to go from “personally watching one agent write code” to “agents are still merging code while you sleep,” and what has to be in place before each step?

### 1.1 The starting point: one person held up by one agent

The speaker's story begins on Meta's React team. He took a month of burnout leave and says that when you are burned out, the most natural thing is to start a new project. He used AI to write code and quickly found that he was spending a lot of time “micromanaging an agent.” At the same time, the community was focused on orchestration: people were discussing in terminals how to build their own orchestrators. He was drawn to the topic because the real problem he wanted to solve was how to make AI coding environments more effective.

This revealed the first failure mode worth noticing. He kept iterating on skills but had no way to measure their actual effect on output or results. At the time, he called it “flying blind”—iterating quickly without visibility. The project later became the foundation of pstack, though he did not know that at the time. Related skills and a `brain` directory remain open source in the `potato/noodle` GitHub repository.

He later clarified his motivation: he wanted to extract his own capabilities and give them to an agent. In essence, it was “teaching the agent to code more like me and to follow processes more like I do.”

### 1.2 “The meat proxy”: the first time he located the bottleneck

After joining Cursor, he worked on the performance of the agents window. His React experience led to an invitation to optimize the interface. The work was highly manual: inspect flame graphs and heap snapshots, then reason through why the application was slow.

After repeating this a few times, he reached the same conclusion as with his personal project: he himself was the bottleneck. He used a precise phrase—he was the “meat proxy” between the agent and Chrome DevTools. The tools were programmable, but he was manually carrying instructions from one side to the other.

> 🔑 **The bottleneck was not the model, but where the person was placed**
>
> When model capability rises but the workflow stays the same, the bottleneck shifts from “the agent is not smart enough” to “the person is doing work that should not require them.” To see whether you are in this state, ask one question: are you using your own judgment to relay machine-executable actions from one tool to another, one at a time?

The timeline is worth noting. He joined in March, and the early work on this happened around the beginning of April. At one point, he abandoned the personal skills he had built up because he thought they no longer applied. Later, while working on the agents window and the new project Grokbot, he found that the parts about verification and rigor still held up.

### 1.3 Why domain expertise matters even more

The host raises a popular question: as people rely more on AI, is domain expertise losing value? The speaker's answer is the opposite.

His reasoning is that the stronger the model becomes, the less likely the bottleneck is on the agent's side. It is instead about whether you can express your intent and goals in a form the agent can understand and execute. If someone has domain expertise and some technical ability—the ability to learn to use agents—and has a clear vision and can express it, they can build a good product. In this view, domain expertise matters because of the quality of expression, not the speed of hand-writing code.

> 💡 **A conclusion that is easy to misread**
>
> “Domain expertise matters more” does not mean “technical details do not matter.” The speaker's condition is that you have “some technical ability and can learn to use an agent.” Without that, expertise cannot be converted into executable instructions, and the bottleneck remains with the person.

### 1.4 Language becomes the interface to an agent

The host has long been interested in language. He talks about thinking continually about how words combine and what a phrase may contain. The speaker adds an observable effect: when you find a word that “hooks” an agent, it will keep reusing that word in its later reasoning trace. Word choice is therefore not merely a matter of style; it changes the agent's behavior.

Both connect their own language training to their work with agents. The speaker mentions his background in theater and his long-standing interest in language and Shakespeare. The host notes that programming languages and natural language now converge in agents: both are languages, and both are communication.

### 1.5 Chapter summary

The conversation answers the “steps” question: how do you move from being held up by one agent to no longer being in the loop? The first step is recognizing that the bottleneck is on the human side. The second is recognizing that domain expertise now creates value through expression. The third is recognizing that language is a new interface layer and word choice can change an agent's behavior. The next chapter asks why, if language and process matter so much, “factory” is still not the right metaphor.

## 2. Why a Michelin kitchen is a better metaphor than a software factory

“Software factory” is a key phrase in the conversation. The speaker says he dislikes it—not because it is inaccurate, but because “factory” often carries negative associations and can direct attention toward assembly lines and output volume. He uses a Michelin kitchen to organize his thinking instead.

### 2.1 What the factory metaphor leaves out

A factory metaphor is good at describing repetition and throughput. It is less good at describing the most important thing in this way of working: where the standards come from. The speaker is not asking “how do we repeat things faster?” but “how do we establish standards and have the people doing the work constrain themselves accordingly?” In his framing, a sous-chef trained by a head chef must understand the menu and the standards, not merely execute actions.

> ⚠️ **Two consequences of misusing the factory metaphor**
>
> First, people focus on adding more agents and overlook whether the environment can constrain them. Second, they treat output volume as the goal and use the number of PRs as a quality metric. The speaker later clarifies that a substantial share of the 2,500 PRs was maintenance, not 2,500 new features.

### 2.2 From solo chef to sous-chefs: the basis for division of labor

The speaker reduces the question to something concrete: how do I go from “one person cooking” to “having a few sous-chefs help me”? The key is the basis for dividing the work. He stresses that he is not “dividing work for the sake of dividing it,” but splitting tasks in ways that improve the overall result. His contrast is that a sous-chef who not only cooks but also organizes the whole kitchen needs very different expectations and tools.

### 2.3 Name and reputation

He offers another reason a restaurant is a better metaphor than a factory: your name remains attached to your work, and so does your reputation. How you build the kitchen affects how people see what you deliver. The factory metaphor misses this layer; no one is remembered for the volume coming off an assembly line.

### 2.4 Chapter summary

A Michelin kitchen better describes this work because it includes standards, the basis for division of labor, and reputation, while the factory metaphor captures only throughput. This choice has practical consequences: it shifts attention away from “open more agents” and toward “build the kitchen first.” Once the kitchen is ready, the next question is what lets you trust the work when you cannot inspect every dish.

## 3. Verification: the one skill that lets you remove yourself from the loop

If the conversation could leave only one conclusion, the speaker's answer is verification. He calls it the most important skill in the toolkit and the part he spent the most time tuning. The reason is direct: only when agents can verify their own work can people be removed from the loop.

### 3.1 Why verification comes first

The speaker's meaning of verification is concrete: give the agent “hands and eyes” so it can run code and interact with the result rather than merely generate text. He describes the first skill he built after joining Cursor, and the one that actually let him climb the trust ladder. His contrast is clear: no matter how good his earlier skills were, the ladder did not move as long as “I” remained the proxy between the agent and the output.

### 3.2 From self-verification to hill climbing

The first concrete use of verification let him do “hill climbing” on performance work. The method has only two parts: a rubric that can score or judge the result, and a loop that can iterate repeatedly. With both, the agent can keep trying to improve instead of waiting for a person to judge every step.

The speaker connects this idea to Andrej Karpathy's publicly released Auto Research, saying the two share the same set of ideas. He also mentions his view of frontier models such as Opus 5.5 as an example of why handing off the evaluation criteria has become viable.

### 3.3 Verification skills become critical infrastructure

At the team level, he says verification skills have become critical infrastructure because everyone uses them. Each application has a verification skill that is maintained automatically; these skills keep getting updated without people having to synchronize them by hand.

> 🔑 **Two layers of verification**
>
> For an individual, verification lets an agent check itself and moves the person out of the judgment loop. For a team, verification skills are maintained and shared, so they establish a behavioral baseline for everyone and every agent—not just one task. This second role is often underestimated, but it determines whether the approach can remain stable across a team.

### 3.4 Chapter summary

Verification comes first because it is the only skill that changes the person's position in the loop. With a runnable standard for judgment, the agent can inspect its own work and the person can step back. A hill-climbing loop needs both a rubric and repeated iteration. When verification skills are shared and maintained automatically across a team, they become a behavioral baseline rather than an individual trick. The next question is which parts should no longer be left to the agent's judgment if verification is to be rigorous.

## 4. Hand off the deterministic work

The speaker repeatedly emphasizes one design principle: take deterministic work away from the agent and leave it only the parts that genuinely require judgment. This principle explains both why he writes CLIs and why skills have their current shape.

### 4.1 When to use a script and when to use judgment

He draws the distinction as a spectrum. Some work depends entirely on judgment and requires combining multiple pieces of context. Other work is highly mechanical, such as refactoring code from one pattern to another. The agent should not have to rethink and reinvent a solution every time for the latter.

He traces the CLI in his verification skill to a specific early concern. At the time, the community was focused on context-window management. Compression and summarization were not very good, and one common belief was that once an agent compressed its context, the rest of the session would become less capable. People therefore cared a lot about context efficiency. This was the direct motivation for encoding deterministic parts of verification as scripts or a CLI.

> ⚠️ **A recurring source of mistakes**
>
> Without a CLI, every agent would “rebuild the world” to verify its work, and each agent would do it differently. The costs were twofold: context was consumed and execution slowed down. Worse, a useful script written by one agent would be discarded, and the next agent would write it again.

### 4.2 Three benefits of a CLI

Once deterministic work is encoded in a CLI, the benefits are easy to separate. For context, the agent no longer has to reinvent an existing capability. For speed, it avoids the cycle of writing a script, testing it, failing, and rewriting it. For consistency, every agent using the skill shares the same implementation, so the same action is performed the same way each time.

### 4.3 A skill is a thin wrapper

The speaker is deliberately modest about skills themselves: a skill is not novel software; it is glue that interacts with Playwright, the Chrome DevTools Protocol, and a few APIs. He prefers to think of a skill as a wrapper containing a small amount of guidance on how to use its custom tools.

> 💡 **Why putting code inside a skill can make the skill more useful**
>
> Moving deterministic logic into scripts lets the skill retain information while staying small. The agent reads less explanation and has more actions it can execute correctly. This runs against the usual intuition that more instructions make an agent more compliant. The speaker's experience is that fewer instructions and more code are more reliable. Once deterministic and non-deterministic work are separated, the agent can focus on the work it was trained to do.

### 4.4 Another use for this principle

Migration and refactoring are another example. When moving from one technology stack to another, especially toward a stack more suitable for agents, the main tools are deterministic ones such as scripts and CLIs: codemods, AST traversal, and mechanical code transformations. Scripts perform these actions according to fixed rules instead of asking the agent to make an ad hoc judgment every time.

### 4.5 Chapter summary

The division between deterministic and non-deterministic work answers which parts should not be left to an agent's judgment. Mechanical work that can be fixed into rules should be written as a script or CLI; only work requiring trade-offs should remain with the agent. This reduces context use and execution time while making the same action consistent. Under this division, a skill becomes a thin wrapper with only the necessary guidance. The next chapter covers the equivalent at the codebase level: rather than writing a rule in instructions, make the error impossible.

## 5. The environment as a constraint: make errors impossible

The speaker offers a judgment about the engineer's changing role: the environment is becoming the focus. He describes the environment as a constraint—not a reminder telling an agent not to make mistakes, but a structure that makes a class of mistakes impossible.

### 5.1 The only standard for a good codebase

He cites a short definition: a good codebase is one that is easy to change, meaning changes are unlikely to break things. In practice, this means many guardrails and narrow paths for both people and agents. Guardrails include automated checks such as linting and type checking, but also the abstractions themselves—the team even built a working framework specifically for agents.

> 🔑 **Environment over reminders**
>
> When a mistake keeps recurring, one option is to add it to the instructions; another is to turn it into a constraint. The speaker chooses the latter because constraints do not consume the agent's attention. It does not have to “remember” the rule; it is stopped as soon as it reaches it. This difference compounds during long tasks: instructions can get diluted in context, but structure does not.

### 5.2 Dune: convention-based directories and strict linting

The speaker introduces an internal framework called Dune and offers a simple analogy: it is an internal version of Next.js for the team's Electron application. Dune is designed to encode “there is only one way to do this” into the structure.

The mechanisms include a separate directory for each feature, a convention that puts feature code in a fixed location, and a registry that discovers features by scanning the codebase. Combined with very strict lint rules, this makes it difficult to write bad code. The result frees both people and agents: people regain attention, and agents do not have to decide where a piece of code belongs.

### 5.3 It began with eight God files

The directory convention has a clear origin. The first few versions of the new project Grokbot consisted of eight God files, each at least 10,000 lines long. The speaker had to split them into smaller pieces. The lesson he drew was to watch how agents fail. Whenever he sees a mistake or a better way to do something, he steps back and asks how to turn it into a lint rule and how to make the codebase prevent it from happening.

This also explains a common point of confusion. The host notes an irony: the TypeScript type-definition file is reportedly only 25 lines, while the speaker has just been discussing God files. The speaker acknowledges the contrast and mentions that the implementation may already have been rewritten. The exchange illustrates both sides of the same principle: structural constraints are not about reducing line count, but reducing the number of places where errors can occur.

### 5.4 Type narrowing and the space of constraints

The speaker traces his thinking to his early experience learning TypeScript and type systems. One of his favorite features is type narrowing: start with a broad type that “could be anything,” then use type guards and runtime checks to progressively shrink the set of possibilities until you know “this is not an arbitrary string, but a particular constant.” He sees this shrinking of the possibility space as the same idea as codebase constraints: both reduce ambiguous choices. He even compares it to category theory—restricting the possible types until only one remains.

### 5.5 Chapter summary

The environment changes a rule from something an agent must remember into something it runs into. A good codebase is easy to change; the means are guardrails and narrow paths. Dune encodes “one way to do it” through conventional directories, registry discovery, and strict linting. Eight God files of at least 10,000 lines were the starting point that motivated the convention. Type narrowing expresses the same principle at the type level: shrink the possibility space. Once the environment is in place, the question becomes how machines can keep receiving tasks without a person.

## 6. Two loops: how machines receive work on their own

The speaker distinguishes two kinds of work as the inner and outer loops, and says connecting them is essential to scaling the approach. This is the real mechanism behind the 2,500 PRs.

### 6.1 Where the inner and outer loops diverge

By the speaker's definition, the inner loop is his “agent engineer” working on code according to a snapshot of his intent. The outer loop is what happens in external systems: bug reports appear in Slack, Linear, or X, and these systems are not connected to the inner loop. For a long time, he had to carry information from the outer loop into the inner loop himself.

> 💡 **The key difference is whether information flows back automatically**
>
> Information in the inner loop is self-contained; information in the outer loop is not. Without a trigger between the loops, the person is stuck as a “messenger,” repeatedly carrying context between Slack, Linear, and the agent. This is the same problem as the “meat proxy” from Chapter 1, viewed at another level.

### 6.2 The snapshot of intent goes stale

The speaker uses “snapshot” deliberately. The inner loop works from a copy of his intent at a particular moment, while new information can appear at any time: bug reports, feature requests, or constraints in backend infrastructure. As soon as new information appears, the snapshot starts to go stale, and the responsibility for updating it falls back on the person. His proposed fix is to create triggers that pull external information back into the inner loop.

The resulting setup is straightforward. You can use an MCP service such as Slack or build your own subscriptions. Once connected, the agent can be told, “Subscribe to this channel, and whenever a relevant bug report comes in, triage and reproduce it.” Reproduction relies on the verification skills already established. The speaker says connecting the two loops is powerful because the agent gains the ability to retrieve its own context.

### 6.3 The chief of staff: an agent that does not do the work

The speaker describes a special role he calls the agent's manager, the executive chef, or the chief of staff. This agent does not do the work itself. Its job is to delegate, orchestrate, and manage the subagents reporting to it, while keeping the work moving and passing context along.

Its value is clearest when unexpected work arrives. Suppose dozens of bug reports suddenly come in. The coordinator can decide how to distribute them. The speaker says it can use different agent topologies and decide for itself how to distribute work efficiently across the team.

There is also a counterintuitive design point here. People naturally think “one task, one agent,” but the speaker says that can lose the connections between tasks: agents may duplicate work, or no one may see the higher-level pattern. His example is specific. If you have several slightly different bug reports, looking at them together can be more useful. After seeing only the first, you may think the bug is here; after seeing the others, you realize the issue is at a higher level.

> 🔑 **Why parallel work that looks inefficient can be more effective**
>
> Having several agents work on the same related group of bugs may look like duplicated effort, but it enables pattern recognition across reports. That benefit appears only when tasks are treated as a group rather than individually, so deciding how to group tasks is itself a judgment that cannot be skipped.

### 6.4 “Where am I the bottleneck?”

The speaker turns this into a daily habit: keep asking, “Where am I the bottleneck in this process?” and “Why does my agent need me to answer this question?” The goal is not to make the agent guess, but to have it answer its own questions using real data.

He gives a practical interpretation of popular terms such as “company brain” and “context graph.” These ideas are neither complicated nor abstract; they simply mean “teaching the agent to retrieve information that I would otherwise have to pass along myself.” In his words, the purpose is to remove himself from the equation.

### 6.5 Chapter summary

The inner loop works from a snapshot of intent; the outer loop produces information in systems such as Slack, Linear, and X. Without triggers between them, the person remains a messenger and the intent snapshot keeps going stale. The solution is to feed outer-loop information into the inner loop automatically and introduce a coordinator agent that delegates without doing the task itself. Tasks should be handled in groups, not one by one, because cross-report patterns emerge only when reports are considered together. The key question remains: “Where am I the bottleneck?” The next chapter looks at the actual numbers and costs this mechanism produced.

## 7. What the 2,500 PRs actually consisted of

In the conversation, the speaker proactively clarifies how the number can be misread and where its limits are. This chapter puts the number back in the context and conditions that produced it.

### 7.1 Not 2,500 conversations, and not 2,500 features

The speaker rejects the idea that “2,500 PRs” means he manually started the same number of conversations. His explanation is that once these loops were set up, he was effectively copying himself in parallel. He also says he was not sitting there creating 2,500 sessions.

A substantial proportion of the work was “gardening”—maintenance work rather than new features. He emphasizes that 2,500 PRs does not mean 2,500 features.

> ⚠️ **A note on comparability**
>
> The number of PRs is not suitable for direct comparison for two reasons. First, it mixes feature development with maintenance. Second, it depends on prior investment: the environment and verification skills have to be in place before the same approach can produce this volume. Treating 2,500 as a target without those prerequisites can lead to the opposite result.

### 7.2 Let agents merge their own code

The speaker thinks the real unlock is to reverse the question: how can you let an agent merge its own code? He says turning on “full autopilot” in the tool triggers a very strict, dense verification loop. For each PR, it spins up a group of verification agents and runs fuzzing. Here, fuzzing has a concrete meaning: actually run the application, click and interact with it like a person, and look for regressions and implementation bugs.

He says the combination of verification and environment lets him step back and let agents merge. The next morning, he reviews the commit history. If he finds a problem, he corrects it by reverting, modifying, or adding a lint rule.

### 7.3 Sample instead of tasting every dish

When asked how he reviews 2,500 PRs, the speaker does not claim that infinite review is possible. He admits you cannot stop tasting your own food forever, but at scale it is impossible to taste every dish, especially when running multiple restaurants. So the answer changes from individual review to sampling, with the focus on the process.

He compares this role to a quality inspector in a factory: you cannot check every product, so you sample daily. You carefully inspect the code agents write, look for inefficiencies and bad patterns, then fix the environment instead of fixing that one agent. His criterion is that an isolated incident may not need a change, but if several agents repeatedly take the same shortcut and spread the same workaround, that is a signal to change the kitchen or factory—adjust skills, constraints, lint rules, and the type system so the problem stops recurring.

### 7.4 A buffer queue: record first, handle later

The speaker gives a counterintuitive example. He has an agent continually scan the code for bad React patterns, but instead of letting it fix them immediately, he has it append its findings to a document. Every few days he reviews the document and notices, “These are actually the same issue.” He thinks this buffered, queued approach can be more effective than immediately sending a batch of subagents to fix every occurrence.

The reason has to do with judgment. When people are in pure execution mode, busy completing a continuous stream of tasks as quickly as possible, they can miss the bigger picture. A buffer creates something that a person—or an agent—can inspect using its judgment, revealing patterns that would otherwise be hidden by one-by-one fixes.

This also explains a second value of the chief-of-staff role: it can execute while seeing the forest rather than only each tree.

### 7.5 Chapter summary

The 2,500 PRs were neither 2,500 conversations nor 2,500 features; a substantial share was maintenance work. The result depended on an environment and verification skills that were already in place, so it is not directly comparable to other teams. Letting agents merge their own code required a strict verification loop: spin up verification agents for every PR, fuzz the software, run the application, and look for regressions. Review shifted from checking everything to sampling, with changes made to the environment rather than individual agents. A buffer queue replaces “fix it now” with “record it, then decide,” preserving the ability to recognize patterns across tasks. The next chapter covers the prerequisites and limits.

## 8. Boundaries: one-way doors, verifiability, and the “dark factory”

A method cannot be used reliably unless it states the conditions under which it fails. Later in the conversation, the speaker sets out several boundaries. The two most important are verifiability and irreversible actions.

### 8.1 What does “dark factory” actually mean?

The conversation clarifies the term “dark factory.” The speaker first says it is a factory with the lights on, then corrects himself: in one sense it is dark, because if an agent can merge its own PRs, it can keep working with the lights off while he sleeps.

His concrete picture is that the agents keep working while he sleeps. He has the equivalent of more than ten chiefs of staff, each responsible for a different area: one handles performance in the Grokbot desktop app, another fixes user-reported bugs, and another is experimenting with rewriting it in a different language just for fun. He stresses that the last one is a toy experiment.

The host draws an important distinction. He says “dark factory” can be confused with Karpathy's vibe coding, whose extreme form has almost no code. The host thinks the speaker's approach is entirely different: code and the environment are central, and poor code and a poor environment produce poor output—garbage in, garbage out. The speaker agrees and adds the idea of a “dimmer switch.” He prefers the restaurant analogy because even a restaurant owner occasionally walks into the kitchen and tastes the food. He reiterates the importance of sampling rather than blocking everything.

> ⚠️ **Two different meanings of “dark”**
>
> One meaning is that there is no longer code or an environment to maintain. The other is that the environment is strong enough for agents to merge code without supervision. The required prior investments are opposite: the first ignores the environment; the second invests heavily in it. Confusing them leads to the mistaken conclusion that this method needs no engineering constraints.

### 8.2 Fear and the first step

The speaker does not hide the psychological cost of the first unattended run. He says the first day of turning on the dark factory was frightening: he worried that he might cause a serious accident or break things overnight. He admits it takes courage. Now he is in a much better place and sleeps better, while agents are merging code as he speaks.

### 8.3 One-way doors and two-way doors

The host raises the sharpest question for applying this method in regulated industries. He uses a distinction: some PRs are two-way doors—you can revert after merging. Others are one-way doors, leading to data loss or outcomes that are hard to undo. What if most PRs in your project are one-way doors?

The speaker says it ultimately depends on whether you can get sufficiently strong verification from the agent and make verifiability a prerequisite. When work in a field can be verified, a one-way door can become a two-way door in a sense. If work is difficult to verify programmatically, reaching that point is very hard.

He offers the basis for his judgment: software engineering is suited to this approach because much of it, though not all, is verifiable. Mathematics is another example—not all of it, but some parts can be verified once a proof is written. He admits this is a good question he does not have a complete answer to.

> 🔑 **The underlying condition for applicability**
>
> The scope of this method depends less on task size or team size than on whether the work can be verified. Verifiability means there is a check that can run automatically and produce a trustworthy judgment. The quality of verification determines whether the process can run unattended; the verifiability of the field sets the ceiling on that quality. This condition comes before tool choice.

### 8.4 Bring proofs into the language

The speaker's prediction about the future centers on this point: more programming languages will be designed for agents. He gives one of the most interesting examples he has seen: a language called Bend that combines programming and proofs.

For readers unfamiliar with the idea, a proof makes it possible to formally verify code using mathematics, especially when the code is written in a functional style. Historically, this work has had to be done in a different language, such as Lean or TLA+: first construct the mathematical proof, then use a solver to check whether it covers every case and whether race conditions exist. He compresses the conclusion into one line: if it compiles and the proof says it is correct, why hesitate to merge it? Of course, he adds, not every field is verifiable.

### 8.5 Chapter summary

A “dark factory” means the environment is strong enough for agents to merge code unattended; it does not mean code no longer needs maintenance. The psychological cost of the first unattended run is high, and the speaker describes that fear openly. The one-way-door question exposes the method's boundary: when work is verifiable, a one-way door can in a sense become a two-way door, while unverifiable fields have a hard time reaching that point. The speaker predicts programming languages that combine proofs and code, citing Bend, Lean, and TLA+. With the boundary clear, the conversation returns to a more basic question: what exactly is a skill?

## 9. What exactly is a skill?

Near the end of the conversation, they return to fundamentals: the role and changing shape of skills, and how individuals should build their own skill sets. This section includes the speaker's view of where the methodology is heading.

### 9.1 A skill is a process put into language

The speaker's definition is short: a skill is derived from a process; it turns a process into text. The host adds his version: a skill is essentially English, or some other language; it is Markdown. The speaker agrees and adds that skills and tools complement each other and can be combined as needed.

### 9.2 Skills are getting smaller

The speaker observes a shift. Last year's skills focused more on implementation details, such as specifying exactly which script commands to use. As models improve, those details can be removed, leaving only the process. Skills become a set of steps—a sequence of your own workflows—and this trend will continue: skills will get smaller and more compact.

> 💡 **Why skills can become thinner**
>
> Skills can become thinner when the model itself can handle implementation details. When models are not capable enough, listing specific commands is a necessary compensation. Once they are capable, the same material can become a constraint and a source of noise. How detailed a skill should be is not merely a style choice; it should be reassessed as model capability changes.

### 9.3 Your own conversation history is a mine

The host offers a practical suggestion: go back through your past conversations with agents and mine them for information, especially the places where you had to intervene and correct the agent repeatedly. Turn the higher-level lessons into reusable skills so the agent does not repeat the same mistake. He calls these records a “treasure trove” because they contain real workflows that have already been made concrete.

The speaker agrees and gives a specific origin. He had been working on virtualization issues in the Cursor app, where there were many bugs. Every time he opened a new session, he wished he could carry over the valuable context from the previous one. This need led him to inspect past conversations, then compress the workflow into a skill called recall, so he no longer had to write a long explanation each time. He suggests another use: ask an agent to read your history, identify the patterns in where you repeatedly intervene, and recommend turning them into lint rules or new skills.

### 9.4 Everyone has their own knife

The speaker returns to the cooking analogy. It fits because every chef takes their own knife with them when they change jobs: tools travel with the person. This leads to another explanation of “trust”: trust is really a person's trust in their own tools. If you have spent time sharpening and understanding them, you can make good things.

He acknowledges that everyone's combination of skills and tools will be different. Someone might combine one of the host's skills with execution-oriented skills from pstack and get good results; someone else may depend more on one side. His advice is to read both sets of skills and combine them into your own version. The strength of skills is their adaptability: they are language, and the only “magic” is the thinking involved in turning an abstract process into language.

### 9.5 Chapter summary

A skill is a process expressed in language—essentially Markdown. Skills are getting smaller: as models improve, implementation details that once had to be written down can be removed, leaving the process itself. The most reliable raw material for building a personal skill set is your own conversation history, especially repeated interventions and corrections. Turning these patterns into skills, rules, or lint prevents the same class of error from recurring. Tools should travel with the individual rather than be tied to a team; trust is fundamentally trust in one's own tools. The final chapter brings the discussion together.

## 10. Summary and open questions

At its core, this conversation is a staged guide to removing the human from the loop. The speaker's approach can be compressed into a chain of dependencies: first recognize that the bottleneck is on the human side; then see that domain expertise creates value through expressing intent; build verification so the agent can determine whether its work is valid; encode deterministic work in scripts or a CLI, leaving judgment to the agent; use codebase structure and environmental constraints to make errors impossible; and finally connect the outer loop to the inner loop so the person no longer has to act as a messenger.

Verification is the one irreplaceable link in this chain. The speaker's point is representative: the combination of verification and environment is what lets him step back and allow agents to merge code. Without a runnable check, “unattended” simply means “no one knows what happened.”

The boundaries he draws matter just as much. Sampling replaces one-by-one review because reviewing everything is impossible at scale. A buffer queue replaces immediate fixes to preserve pattern recognition across tasks. The distinction between one-way and two-way doors describes the method's limits when actions are irreversible. The underlying condition is whether the field is verifiable, not task size or tool choice, and he admits that not every field meets this condition.

The notes make two explicit editorial choices so readers can judge their reliability. First, the source audio is an English-language podcast interview, while the Bilibili page title is Chinese, so these notes were translated and organized from an English transcript. During transcription, a language parameter was once set incorrectly, requiring the whole pass to be redone; the final transcript is in English. Second, the user explicitly requested audio transcription only and no video, so these notes contain no video imagery that could be used to cross-check the speakers visually. All claims come from the spoken conversation.

Four practical takeaways are worth keeping. First, when choosing how to verify work, ask “Can the result be judged automatically?” before asking “Which agent should I use?” Second, move recurring errors out of instructions and into the structure so they are blocked before they happen. Third, write deterministic work as scripts and keep skills thin. Fourth, periodically revisit your conversation history with agents, find where you repeatedly intervened, and turn those patterns into skills or rules.

One open question comes from the speaker himself, and he explicitly says he does not have an answer: where does this approach begin in fields that are difficult to verify programmatically, such as parts of medicine, law, and finance? He predicts that more languages will combine proofs with programming, making some previously unverifiable work verifiable. Whether that prediction comes true depends on whether these languages become common in real engineering.
