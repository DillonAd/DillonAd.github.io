---
layout: post
title: Unable to find Ruby class that definitely exists
category: [ruby, rails, errors]
tags: [ruby, rails, ruby on rails, uninitialized constant, uninitialized, constant]
date: 2025-01-12
---

Recently I have been learning Ruby on Rails! With that learning comes a lot of lessons, and this one was both fun and frustrating for me. While working in the Ruby on Rails project, I created a new class and RSpec tests for that class.

`/app/thing/thingy_doer.rb`

```ruby
class Thing::ThingDoer
# ...
end
```

`/spec/thing/thing_doer_spec.rb`

```ruby
RSpec.describe Thing::ThingDoer do
# ...
end
```

I ran the tests and got the following error:

```
NameError:
  uninitialized constant Thing::ThingDoer
```

Crazy right? I specified the class name in the test exactly as it is spelled in the class, but the RSpec tests can't find the class. Why?!

The issue is that Rails has a loading convention that matches the file name to the class name. Due to the mismatch between the name of the `thingy_doer.rb` file and the `ThingDoer` class, Rails can't find the class. 

The solution is is correct the typo in the file name. Once the file is renamed from `thingy_doer.rb` to `thing_doer.rb`, everything now works as expected!

```
5 examples, 0 failures
```