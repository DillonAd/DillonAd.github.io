---
layout: post
title: "Writing Good User Stories"
category: [ agile ]
tags: [ user story, acceptance criteria ]
date: 2019-04-19
comments: true
---

> User Stories are chunks of desired behavior of a software system. - Martin Fowler ([1](https://martinfowler.com/bliki/UserStory.html))

The user story is a basic building block of most Agile-based systems. Over the years, I have noticed some patterns and anti-patterns that have emerged in the user stories that my teams have interacted with. This has lead me to classify user story anti-patterns into a few categories:

### What User Story?

No story was ever even created in the system. The requirements for this story have been communicated either verbally, written on a napkin, or someone assumed the team could telepathically extract the requirements from their mind. Since development team typically won't have a telepath or psychic on staff, these stories are typically forgotten until someone notices that their feature wasn't completed in the release like they expected.

### The Skeleton Story

The absolute bare minimum of information has been put input to get the system to accept the story. Sometimes this can consist of as little as a title. The title may or may not be a complete sentence.

### The Polymorphic Story

This story is repurposed every so often and gets reset to _New_ status with a new description. Kanban teams should beware this story since it never quite makes it to _Done_, ruining the team's throughput metrics.

### The NeverEnding Story

Initially a simple story, yet "little" features keep getting added on. The mantra of this story is "just one more little thing...". 

---

Each of these stories are perpetuated by similar issues. Generally the issues revolve around communication. This is why I am a big fan of writing user stories down. This way they can be seen by everyone and discussed without any ambiguity. If it isn't written down, it isn't getting done. If the users change their mind about what they want while testing the story, that is fine. The current story can be completed, and the new changes that are desired can go into a _NEW_ story. This serves two purposes: first it allows the development team to keep more accurate metrics and secondly it promotes a sense of accomplishment among the team. 

Sometimes teams are lucky enough to have someone whose job it is to gather this information and put it in whatever system the team uses. Sometimes it is up to the developers on the team to gather this information. It is in the developer's best interest to ensure that this information is gathered, agreed on, and persisted. So when asked where [Feature X] is, there is a better answer available than "I don't know" or worse "What is [Feature X]?". There will be a documented history of the feature and the requirements to complete that feature. 

When having to gather my own requirements, there are two parts of a user story that I consider to be the most important. First is the description. The description of the user story provides context from the user about the problem they are trying to solve. Yes, you read that correctly: The description should be a problem statement, not a solution.

The part of a user story that I consider to be of paramount importance is the _Acceptance Criteria_. I have also heard this information called the _Definition of Done_. This is information that allows the development team to know when a story is truly done. If there is no concrete way to say when a user story is complete, then it is nearly impossible to really be done since there is no consensus on what "done" even means. This isn't fair to the development teams, and it isn't fair to the users.

The end goal of all of this is to make sure that the users and the development team are on the same page about what is being delivered. Users get what they expect, the development team doesn't waste time working on misunderstood features, and everyone can go home knowing that their contribution to this process is actually productive.

---

Do you have other examples of user stories gone awry or other ideas on how they can be improved? Leave a comment below!