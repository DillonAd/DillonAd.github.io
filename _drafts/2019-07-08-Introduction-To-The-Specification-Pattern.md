---
layout: post
title: Introduction to the Specification Pattern
category: [ design pattern, beginner ]
tags: [ specification, design pattern, pattern, beginner ]
date: 2019-07-11
---

Recently, I have been working my way through the [Gang of Four's Design Pattern Book](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented-dp-0201633612/dp/0201633612/ref=mt_hardcover?_encoding=UTF8&me=&qid=) and looking deeper into patterns that I can apply in my day to day work. I found the Specification pattern and really gravitated to the idea.

# What is a Specification?

A specification is a query represented in an named object. Vague enough? Here is an example in code:

```cs
using System;
using System.Linq.Expressions;

public class ActiveStudentsSpec
{
  public Expression<Func<Student, bool>> Expression => 
    s => s.IsActive;
}
```

# Why would/should I use a Specification?

This pattern allows query logic to be consolidated into named objects. Doing so has two distinct advantages:
  - The name of the objects allows the intent to be communicated clearly.
  - Consolidating logic into objects reduces duplication and makes it easier to spot future duplication.
  - Isolates business logic to allow for simple unit testing.

The big advantage of this approach for me is that I can not only name the logic, but I can compose the specifications to create easily readable code. 

To put a cherry on top of all of this, these objects allow for completely isolated unit testing of the logic they contain. This mean I don't have to mock or fake an ORM, or worse stand up a real data store. The isolated nature makes these tests amazingly fast and reliable.

# A Concrete Example

Let's start with a `Student` class that the previous specification was based on.

```cs
using System;

public class Student
{
  public Guid Id { get; set; }
  public string Name { get; set; }
  public double Average { get; set; }
  public bool IsActive { get; set; }
}
```

The task at hand is to get all students that scores greater than or equal to 70.0 in the class. To accomplish this, we can create the following specification:

```cs
using System;
using System.Linq.Expressions;

public class PassingStudentSpec
{
    public Expression<Func<Student, bool>> Expression =>
        s => s.Average >= 70.0;
}
```

Using this specification, filtering the data becomes extraordinarily readable.

```cs
using System.Collections.Generic;

public class StudentService
{
  private readonly IEnumerable<Student> _students;

  public StudentService(IEnumerable<Student> students)
  {
    _students = students;
  }

  public IEnumerable<Student> GetPassingStudents()
  {
    var passingStudents = new PassingStudentSpec();
    return _students.Where(passingStudents.Expression.Compile());
  }
}
```

The alternative being:

```cs
using System.Collections.Generic;

public class StudentService
{
  private readonly IEnumerable<Student> _students;

  public StudentService(IEnumerable<Student> students)
  {
    _students = students;
  }

  public IEnumerable<Student> GetPassingStudents()
  {
    return _students.Where(s => s.Average >= 70.0);
  }
}
```

Notice the difference? Almost none, right? In simple use cases, this pattern really ends up being overkill. So let's add some complexity and let the Specification pattern shine.

```cs
using System.Collections.Generic;

public class StudentService
{
  private readonly IEnumerable<Student> _students;

  public StudentService(IEnumerable<Student> students)
  {
    _students = students;
  }

  public IEnumerable<Student> GetPassingStudents()
  {
    return _students.Where(s => s.Average >= 70.0);
  }

  public IEnumerable<Student> GetCurrentPassingStudents()
  {
    return _students.Where(s => s.Average >= 70.0 && s.IsActive);
  }
}
```

Now we have duplication! The risk of these two methods falling out of sync with each other grows each time the code is changed. To mitigate that risk, our specification can be used!


```cs
using System.Collections.Generic;

public class StudentService
{
  private readonly IEnumerable<Student> _students;

  public StudentService(IEnumerable<Student> students)
  {
    _students = students;
  }

  public IEnumerable<Student> GetPassingStudents()
  {
    var passingStudents = new PassingStudentSpecification();
    return _students.Where(passingStudents.Expression.Compile());
  }

  public IEnumerable<Student> GetCurrentPassingStudents()
  {
    var passingStudents = new PassingStudentSpecification();
    return _students.Where(passingStudents.Expression.Compile())
                    .Where(s => s.IsActive);
  }
}
```

In this case, the benefit gained by introducing the specification is that if there is ever a need to change what defines a "passing student" there is one place to change that logic!

// TODO : Bonus Round! Composing Specifications

# Conclusion

In the end, there are many ways to acheive the same benefits the Specification pattern provides. That being said, I believe the Specification pattern provides the cleanest and most testable solution. 