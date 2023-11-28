import "./audio-summary-transcription.css";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JsPDF from "jspdf";
import "./PdfGenerator.css"; // Create a CSS file for styling
// import lectureVideo from"../../images/lectureVideo.mp4";
import lectureData from './autoChapters.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function AudioSummaryTranscription() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const videoRef = useRef(null);



  const navigateToTimestamp = (timestamp) => {
    // Split the timestamp string into minutes and seconds
    const [minutes, seconds] = timestamp.split(':').map(Number);
  
    // Check if both minutes and seconds are valid numbers
    if (!isNaN(minutes) && !isNaN(seconds)) {
      // Convert to seconds and set as currentTime
      const totalSeconds = minutes * 60 + seconds;
  
      if (videoRef.current) {
        videoRef.current.currentTime = totalSeconds;
      }
    } else {
      console.error('Invalid timestamp:', timestamp);
    }
  };

  const navigateToNewSummarize = () => {
    navigate("/new-summary");
  }
  

  const generatePdf = () => {
    // const report = new JsPDF("portrait", "pt", "letter");
    const report = new JsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a2",
      
      
    });
    // Add content manually using text() or other drawing functions
    report.text("CS50x 2023 - Lecture 1 - C", 30, 30);
    report.text("Summarization", 30, 60);

    // Add lecture data
    lectureData.forEach((lecture, index) => {
      const yPosition = 80 + index * 100; // Adjust the spacing as needed
      report.text(`${lecture.header} - ${lecture.timestamp}`, 30, yPosition);
      report.setFontSize(16);
      report.text(lecture.content, 30, yPosition + 20, { maxWidth: 800 }); 
    });

    report.save("report.pdf");

    
  };


  return (
    <div className="summary-page">
      <div className="export-btn-div">
        <button className="export-btn" onClick={generatePdf}>
          Export Notes
          <FontAwesomeIcon className="icon-img2" icon={faFileExport} />
        </button>
      </div>

      <div className="summary-container">
        <div className="left-half">
          <div className="summarization" id="report">
            <div className="text-wrapper-ast">Summarization</div>
            <div className="textarea">
            {lectureData.map((lecture, index) => (
        <div key={index}>
          <p>
            <strong>{lecture.header} - </strong>
            <a className="timestamps" onClick={() => navigateToTimestamp(lecture.timestamp)}>
              {lecture.timestamp}
            </a>
          </p>
          <p>{lecture.content}</p>
          <hr />
        </div>
      ))}
              <br></br>
              
            </div>
            <button className="next-button" onClick={navigateToNewSummarize}>
        New Summary
      </button>
          </div>
          
        </div>
        <div className="line-breaker"></div>
        <div className="right-half">
          <div className="upper-half">
            <div className="video">
              <div className="text-wrapper-ast">Video</div>
              <div className="textarea-video">
    <div>
      <video className="video" controls ref={videoRef}>
        <source  type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
              </div>
            </div>
          </div>
          <div className="lower-half">
            <div className="transcription">
              <div className="text-wrapper-ast">Transcription</div>
              <div
                className="textarea-transcript"
                // value={state.transcriptionData}
                
              >
                This is CS 50 and this is week one wherein we continue programming, but we do it in a different language because recall last time we focused on this graphical language called Scratch. But we use Scratch not only because it's sort of fun and accessible, but because it allows us to explore a lot of these concepts here, namely functions and conditionals, boolean, expressions, loops, variables and more. And so indeed, even if today's syntax as we to this new language called C feels a little bit cryptic, maybe a little intimidating at first, and you don't quite see all of the meaning of the symbols beyond the syntax itself, realize that the ideas are ultimately going to be the same.
In fact, as we transition from what was last week a Hello World program that looked a little something like this, this week, of course, it's going to now look a little more cryptic. It's going to look a little something like this. And now, even if you can't quite distinguish what all of the various symbols mean in this code, turns out that at the end of the day, it's indeed going to do what you expect.
It's just going to say hello, world on the screen, just like we did in Scratch. So let's start to apply some terminology to these tokens first. So what we're about to see, what we're about to write, henceforth we're going to start calling source code.
Code that you, the human programmer, write is just henceforth called source code. Doesn't matter if it's Scratch, doesn't matter if it's C, doesn't matter if it's Python. Before long, source code is the general term for really what you and I, as human programmers will ultimately write.
Of course, computers don't understand source code. It turns out computers don't understand scratch and puzzle pieces per se, or C code like we're about to see. They only understand this, which we called what, last week? Yeah.
So this is binary zeros and ones, but really it's just information represented in binary. And in fact, the technical term now for patterns of zeros and ones, that a computer not only understands how to interpret as letters or numbers or colors or images or more, but knows how to execute as well, henceforth is going to be called machine code to contrast it with source code. So whereas you and I, the humans, write source code, it's the computer that ultimately only understands machine code.
And even though we won't get into the details of exactly what pattern of symbols means what, you'll see that in this kind of pattern of zeros and ones, there's going to be numbers, there's going to be letters, but there's also going to be instructions. Because indeed, computers are really good at doing things, addition, subtraction, moving things in and out of memory. And suffice it to say that the Macs, the PCs, the other computers of the world have just decided as a society what certain patterns of zeros and ones mean when it comes to operations as well.
So not just data but instructions, but those patterns are not something we're going to focus on in a class like this. We're going to focus on the higher level software side of things, simply assuming that we need to somehow output machine code. So it turns out then that this problem we have to solve, getting from source code to machine code actually fits into the same paradigm as last time.
But the input in this case is going to be source code on the one hand, like that's what you and I ideally will write so that we don't have to write zeros and ones, but we need to somehow output machine code because that's what your Macs, PCs, phones are actually going to understand. Well, it turns out there are special programs in life whose purpose is to do exactly this conversion, convert the source code you and I write to the machine code that our phones and computers understand and that type of program is going to be called a compiler. So indeed today we'll introduce you to another piece of software and these come in many forms.
We'll use a popular one here that allows you to convert source code in C to machine code in zeros and ones. Now you didn't have to do this with scratch. In the world of scratch it was as simple as clicking the green flag because essentially MIT did all of the heavy lifting there figuring out how to convert these graphical puzzle pieces to the underlying machine code.
But now, starting today as we begin to study programming and computer science proper, now that power moves to you and it's up to you now to do that kind of conversion. But thankfully the fact that these compilers exist means that you and I don't have to program in machine code like our ancestors once upon a time did, be it virtually or with physical punch cards like pieces of paper with holes in them, you and I get to focus on our keyboard as such. But it's not just going to be a matter today of like writing code, it's going to be a matter ultimately today onward of writing good code as well.
And this is the kind of thing that you don't just learn overnight. It takes time, it takes practice. Just like writing an essay in any subject might take time and practice and iteration over time.
But in a programming class like CS 50 we're going to aspire to evaluate the quality of code along these three axes generally. Is it correct first and foremost? Like does the code do what it's supposed to do? After all if it doesn't, well what was the point of writing it in the first place? So it sort of goes without saying that you want code you write to be correct and it's obviously not always. Again, anytime your Mac or PC or phone has crashed some human somewhere wrote buggy, that is code with mistakes.
The programs we're using were not necessarily written with the least comfortable audience in mind, but really professional programmers back in the day. But through practice and through experience and through mistakes, you'll start to notice patterns here, too. So here's what I typed.
Make hello after the dollar sign prompt. Now I get yelled at with as follows. Hello, c 529.
Well, what's that referring to? I've screwed up somewhere on line five on the 29th character on that line. Generally, the specific character is not that useful unless you actually want to count it out. But line five is a good clue why it means I screwed up somewhere on line five here.
All right, well, what is the error expected? A semicolon after expression. And this error is actually pretty obvious now that I see it and I realize, oh, wait a minute. All right, here's my line of code here in sort of ASCII art, so to speak, text representing graphics.
It wants me to put in green here this semicolon at the end of that line. One error generated, built in. So some esoteric stuff there, but my program did not compile.
When you see an error like this, it means it did not work. So what's the fix? Well, obviously the fix is to go back up here, put the semicolon there, and now if I recompile my code with make hello, I won't clear my screen just yet, just to show you the difference. Now it just worked.
So we're back in business as before. All right. Let me pause here, though, and ask if there's any questions about what I just did.
These error messages will become frequent initially. Yeah, really good question. Do you need a semicolon after every line or just some, it turns out, just some.
This is something you'll learn through practice, through demonstrations and examples today. Generally, you put a semicolon after a statement, so to speak, and this is the technical term for this line of code. It's a statement.
And think of it as it's kind of the code equivalent of like an English sentence. So the semicolon in code is sort of like a period in English. When you're done with that particular thought, you don't need semicolons for now anywhere else.
And we'll see examples of where else you put them. But it usually is at the end of a line of code that isn't purely syntactic like curly braces. Instead, other questions on the mistake.
I just fixed and created for myself. Yeah, correct. So line five is where the error is most likely.
Character 29 means it's sort of 29 characters that way. And then it's actually, in this case, giving me a suggestion. The compiler won't always know how to advise me, especially if I've made a real mess of my code.
But often it will do its best to give you the answer. Like this. Yeah.
So how come I first typed code space Hello, C, and now I'm typing make hello, two different processes. So when I typed code space Hello, C, that was because I wanted to open Vs code and create a new file called Hello, C. It's like going to file new in a Mac or PC.
Thereafter, though, once the file exists and is actually open here, and it does auto save, you don't need to hit command s or control s all the time. I can now compile it with Make Hello again and again. So theoretically, I should never need to type code space Hello, C again, unless I want to create a brand new file called The Same Thing.
All right, so what about this other piece of syntax here? Let me clear my terminal window here. You can also hit CTRL L just to throw everything away, just to clean it up. Aesthetically, suppose that I omit whatever this sequence of symbols is backslash n, since I'm not really sure at first glance why that's even there.
Does anyone want a conjecture? Especially if you've never programmed before what might happen. Now if I recompile and rerun this version of the program, I left the semicolon, but I took away the backslash n. Any instincts? All right, well, yeah.
Will the next dollar sign appear straight after your Hello, World? It will. The next dollar sign will appear right after my hello, world. But what makes you think that exactly? Backslash n is actually a special sequence of symbols that creates a new line.
And so, to your point, if I recompile this program, make hello, enter. No syntax error. So it did compile this time.
So you don't need the backslash n, you do need the semicolon. But if you don't have the backslash n, watch what happens when I dot slash hello this time. Now.
Indeed, I see hello, comma world. And then a weird dollar sign. And this is still a prompt I can still type commands at.
It like clear. And everything gets cleaned up, but it just looks kind of stupid if I run it again here with dot slash hello. It's just not very user friendly.
It is convention that when you're done running your program, you should ideally clean things up. Move the cursor to the next line for the user. And so the backslash n is simply the special symbol, otherwise known as an escape sequence.
A company would have its own sense of style and how its code should look. And there's generally automated tools within a company that help give feedback on the code or stylize it. As such, there are alternative styles than what we use in the class.
We deliberately keep and ask that you keep the curly braces on their own line, if only because it rather resembles like the hugging nature of scratches blocks and just makes clear that they're balanced open and closed. However, another common paradigm in some languages and with some programmers is to do something like this on each of them. So you have the opening curly brace on the same line as here.
We do not recommend this. This is in vogue in the JavaScript world and some others, but ultimately in the real world it's up to each individual programmer and or the company they're working for, if applicable, to decide on those things. All right, so beyond then these conditionals, what if we want to do something that's maybe pretty common? So almost every piece of software or website nowadays that you use has you agree to some terms and conditions by typing like yes or no or just Y for yes and N for no.
So how could we implement some kind of agreement system? Well, let me do this, let me create a new program, a third one called Agree C. So I'm going to write code Agree C just to give myself a new tab. I'm going to start as always.
Now include CS 50 H, let's include standardio H and then let me do my int main void which again for today's purposes we'll take at face value is just copy paste. And if I just want to get Y or N, for instance, instead of yes or no, we can just use a simpler variable here. How about just a char, a character, a single character so I can use getchar to ask the user.
For instance, do you agree? Question mark. But as before, I need to store this somewhere. So I don't want a string because it's a single char.
I don't want an int, I just want a char, and it's literally char. And then I can call this thing anything I want. It's conventional.
If you have a simple program with just a single variable and it's of type char, call it C. If it's an int, call it I. If it's a string, call it S.
For now, I'm just going to keep it simple and call it C. And now I'm going to ask a question. So if C equals equals, how about quote unquote y, then let me go ahead and print out agreed backslash n as though they agreed to my terms and conditions.
Otherwise, let's see else if the character equals equals quote unquote n, then let me go ahead and print out say not agreed as though they didn't quote unquote and let's leave it at that. I think here initially. Now you'll notice one curiosity, one inconsistency, perhaps.
Does anyone want to call it out? Though it's somewhat subtle, I've done something ever so slightly differently without explaining it yet. Do you see it single parenthes? Yeah. So I've suddenly used single quotation marks for my single characters and double quotes for my actual strings of text.
This is a necessity in C. When you're dealing with strings like strings of text, like someone's name a sentence, a paragraph, anything really more than one character, you typically use double quotes. And indeed you must when dealing with deliberately single characters, like I am here for y or N, you'd must use single quotes instead.
Why? Because that makes sure that the computer knows that it's indeed a char and not a string. So double quotes are for strings, single quotes are for chars. So with that said, let me go ahead and zoom out.
Let me go ahead in my terminal window run, make agree enter seems to work okay. So let me go ahead and dot slash agree. Let me go ahead now and type in Y.
Here we go. Enter. Let me try that again.
Rerun agree how about no enter. Why is it not behaving as I would have expected? Because you appeared at capital Y caps. Yeah, I kind of cheated there.
And I hit the Caps Lock key just as I started typing in input y, because I deliberately wanted to type in uppercase instead of lowercase, which is kind of reasonable. It's a little obnoxious if you force the user to toggle their Caps Lock key on or off when you just need a simple answer. That's not the best user experience or UX, but it would work if I cooperated.
Let me run this again without Caps Lock on y lowercase for yes, that worked. N lowercase for no, that worked. But how could I get it to work for both.
Well, how about this? Let me go ahead and just add two possibilities. So else if C equals equals quote unquote capital Y, then also do printf agreed backslash n and down here. Else if C equals equals single quote capital N, then go ahead and print out again not agreed.
Okay, this I will claim now is correct and I'll do make agree real fast. Agree. And I'll use capital it now works.
I'll use capital it again works. But this is perhaps not the best design. Let me hide the terminal window and pull this up on the screen all at once.
Why might this arguably not be the best design even though it's correct? There's another term of art we can toss here. Like something smells kind of funky about this code. This is an actual term of art.
Like there's code smell here. Like something smells a little off. Why, what do you think? Yeah, there's the same output again and again.
I mean, I manually typed it, but honestly, I might as well have just copied and pasted most of my original code to do it again and again for the two capital letters. So if line ten and 14 are the same and line 18 and 22 are the same, and then the rest of these if and else ifs are almost the same, there's some code smell there like it's not well designed. Why? Because if I want to change things now, just like last week in scratch, I might have to change my code in multiple places or copy paste is never a good thing, god forbid.
I want to add support for yes and no as full words. It's really going to get long. So how can we solve this? Well, it turns out we can combine some of these thoughts.
So let me try to improve the yeses first. It turns out if I delete that clause, I can actually or things together in scratch. There's a couple of puzzle pieces, if you didn't discover them, that literally have the word or and the word and on them which allow you to combine boolean expressions.
So that either this or this is true or this and this is true. In C, you can't just say the word or. You instead use two vertical bars and vertical bars together, mean or logically.
And so I can say c equals equals quote unquote capital Y. Agreed. And now I can get rid of this code down here and let me go ahead and say vertical vertical bar twice c equals quote unquote n in all caps.
And now my program is like roughly a third smaller, which is good, there's less redundancy. And if I reopen my terminal window rerun make of agree now I can type little y or big y and same thing for lowercase and uppercase N. Any questions then on this syntax whereby now you can combine thoughts and just kind of tighten things up and there'll be other such tricks too.
Yeah, a really good question is there not a function to just ignore the case? Short answer there is. And we'll see how to do that in actually just about a week's time. And in other languages there's even more ways to just canonicalize the user's input, throwing away any space characters they might have accidentally hit, forcing everything to lowercase in C.
It's going to be a little more work on our part to do that, but in fact, as early as next week, we'll see how we can do that. But for now we're comparing indeed just these literal values. Other questions? Really good question.
So we are assuming with this program, in all of my last ones, that the humans cooperating, when I asked for their name, they typed in David and not one, two, three, or in this case, they typed in a single character and not a full word. So this is one of the features often of using a library. So for instance, if I run agree again and I say something like sure, enter, it rejects it altogether.
Why? Because S-U-R-E is a string of characters, it's not a single character. Now, I could just say something like X, which is neither Y nor N, of course, but it tolerates that because it's a single character. But built into CS 50s library is some built in rejections of inputs that's not expected.
So if you use get int and the user types in not the number one or two, but cat C-A-T it will just prompt them again. Prompt them again. And this is where two, if you were to do this manually in C, you end up writing this much code just to check for all of these errors.
That's why we use these training wheels for a few weeks just to make the code more robust. But in a few weeks time we'll take the library away and you'll see and understand how it's indeed doing all that. All right, so how about this? Let's now transition to something a little more scratch like literally by creating.
How about another program here called Meow? So Meow C. We won't have any audio capabilities for this one. We'll just rely on print.
And suppose that I wanted to write a program in C that just simulates like a cat meowing. So I don't need any user input just yet. So I'm just going to use standardio H.
I'm going to do my usual int main void up here and then I'm just going to go ahead and do printf meow backslash N, and let's have this cat meow three times like last week. So I'm going to do meow, meow, meow. Notice as an aside, whenever you highlight the lines, you'll see little dots appear.
This is just a visual cue to you to let you figure out how many spaces you've indented vs code. Like a lot of editors will automatically indent your code for you. I've not been hitting the spacebar four times every time.
I've not even been hitting tab. However, in C, the convention is indeed to indent lines where appropriate by four spaces. So not three, not five.
And these dots help you see things so that they just line up as a matter of good style. All right, so this program I'm just going to stipulate right now is indeed going to work. Make meow, which is kind of cute.
And now meow there three times. Correct it's meowing three times. But of course this is not well designed.
It wasn't well designed in scratch last week. Why? What should I be doing differently? Yeah, it's a perfect opportunity for a loop. Why? Because if you wanted to change maybe the capitalization of these words, or you wanted to change the sound to like woof for a dog or something, like, you'd have to change it one, two, three places.
And that's just kind of stupid, right? In code, you should ideally change things in one place. So how might I do that? Well, we could introduce a loop. Yes, but we're going to need another building block as well that we had in scratch, namely those things called variables.
So recall that a variable like an algebra, X-Y-Z whatever, can store a value for you. And a variable in scratch might have looked like this. You use this orange puzzle piece to set a variable of any name, not just X, Y or Z, but you could call it something more descriptive, like counter.
And you can set it equal to some value in C. The way to do this is similar to spirit, to some of the syntax we've seen thus far. You start by saying the name of the variable you want a single equal sign and then the value you want to initialize it to copying, therefore, from right to left.
Why? Because the equal sign denotes, again, assignment from right to left. This isn't enough, though. You might have the intuition already, what's missing probably from this line of code, just to create a variable.
So we need int to make sure the computer knows that this is indeed an int. And then lastly, semicolon as well. And that now completes the thought.
So a little more annoying than scratch, but we're starting to see patterns here, so not every piece of syntax will be new. All right, if you wanted to increment the counter by one, scratch uses the verb change, and they mean add the value to counter. So if I want to increment an existing variable called counter, this syntax is a little more interesting.
It turns out the code looks like this, which almost seems like a paradox, like, how can counter equal counter plus one? Like, that's not how math works. But again, a single equal sign is assignment from right to left. So this is saying take whatever the value of.
Counter is add one to it and copy that value from right to left into counter itself. You still need the semicolon, but I claim you do not need to mention the keyword int when updating an existing variable. So only when you create a variable in C do you use the word string or the word int or any of the others we'll eventually see only when creating it or initializing it for the first time thereafter, if you want to change it, it just exists.
It's the word you gave it. The computer is smart enough to at least remember what type it is. So this line is now complete.
Turns out, in code, as we'll see, it's pretty common to want to add things together, increase increment things by one. So there's actually different syntax for the same idea. The term of art here is syntactic sugar.
Like there's often in code many ways to do the same thing, even though at the end of the day they do exactly the same functionality. So, for instance, if after a few days of CS 50, you find this a little tedious to keep typing in some program, you can simplify it to just this. This is the syntactic sugar.
You can use plus equals and only mention the variable name once on the left, and it just knows that that means the previous thing. It's just slightly more succinct. This two is such a common thing to add one to a value, and it doesn't have to be one, but in this case it is.
But if it is indeed one, you can further tighten the code up to just do this counter plus plus. So anytime in C, you see plus plus, it means literally adding one to that particular variable. There's other ways to do this in the other direction.
If you want to subtract one from a variable, you can use any of the previous syntax using a minus sign instead of plus. Or you can more succinctly do counter minus minus. This is the way a typical C programmer would do this.
All right, so if we have now variables, let's go and solve the meowing with loops. So in scratch we saw loops like this. This, of course, had the cat meow three times.
How do we do this in C? Now, this is where things get a little more involved code wise. But if you understand each and every line, it will follow logically what's going on. So here, I claim, is one way to implement a loop that iterates three times in C.
And this is kind of ridiculous, right? Like we went from two super simple puzzle pieces like this to my God, like it's 123456 lines of code, all of which are pretty involved. So that escalated quickly. But what's each line doing? And we'll see other ways to do this more simply.
So we're initializing a variable called counter to three, just like before. Why? Well, what does it mean to loop or to repeat something three times? Well, it's kind of like doing something three times and then do it, and then count down. And then do it, and then count down, and then do it until you're all out of counts.
So this is declaring a variable called counter setting it equal to C. Then I'm inducing a loop in C, which is similar in spirit to repeat three. But you have to do more of the math yourself.
So I'm asking the question in parentheses. While counter is greater than zero, what do I want to do? Well, per the indentation inside the curly braces, I want to meow one time. And then, to be clear, what's this last line of code doing? If counter starts off at three, this makes it two.
By subtracting one from it. Then what happens? By nature of a loop, just like in scratch, it kind of knows to go back and forth, even though there's a nice pretty arrow in scratch and there isn't here, C knows to do this again and again and again, constantly asking this question and then updating this value at the end. So if I highlight just a few of these steps, the variable starts off at three.
And actually, let me simplify two. I claimed earlier that when using single variables, people very often just call it I for int or C for char or S for string, unless you have multiple variables. So let me tighten the code up.
And this already makes it look a little more tolerable. Let me actually tighten it up further. And one more step.
So now this is about as tight as succinct as you can make this code at the moment. So what's actually going to happen here? Well, the first line of code executes and that initializes I to three. Then we check the condition.
While I is greater than zero, is I greater than zero. Well, per my three fingers, obviously. So we print out meow on the screen.
Then we subtract one from I, at which point now we have two as the value of I. Then the code goes back to the condition. And notice the condition there is in parentheses, that's another boolean expression.
So loops can use boolean expressions, just like conditionals use boolean expressions to make decisions. The loop, though, is deciding not whether to do this thing or that, but whether to do the same thing again and again and again. And as it ticks through the code, one line after the other, it's ultimately going to get down to one and then zero and then stop.
So put another way, came with some props here. So suppose this bowl here is your variable and you initialize it to three with like three stress balls. You can do something three times, right? If I want to give out three stress balls, here's your chance for free stress balls without having to answer any questions.
Okay, there we go. So here we go. Subtracting one from my variable.
I'm left with two. Oh, my God. All right.
Don't tell Sanders. Oh, I'm sorry. Okay, that ended poorly.
Apologies. All right. But now the educational point, though, is that my variable has been decremented further to just have I'm not throwing that far again.
I can't do this. Here we go. All right, here we go.
And one final subtraction. And now our variable is left empty. So we have three stress balls there.
And that's all a variable is, right? It's some kind of storage. It's actually, of course, implemented in the computer's memory. But metaphorically, it's really just like a bowl with some values.
And every time you add, or in this case, subtract, you're just changing the value of that variable. And then the code, meanwhile, of course, in parentheses is just checking, is the bowl empty? Is the bowl empty? Is the bowl empty? Aka, is I greater than zero or not? Any questions on how we've implemented loops in this way? And all of you a stress ball after class questions on loops. All right, so it turns out this is kind of ugly.
And this really starts to take the fun out of programming when you have to write out this sequence of steps. So it turns out there's other ways to do this. But first, let's see logically how else you might express this, because it's a little weird that we keep using zero.
Like, it might be the most human like to think in terms of one to three. It might be the most stress ball, like to think in terms of three to zero counting down. But typically, the go to syntax for most programmers, once you get comfortable counting from zero is to always start counting from zero and count up to less than the value you're counting up to.
So it would be incorrect, y, to change this to less than or equal to three. Here what would happen if I change the less than to less than or equal to it'll link me out quite yeah, a fourth time, in fact, total. Right.
So let's do int I gets zero. How about then while I is less than three, then let's go ahead and say printf, quote unquote mellow meow backslash n and then we have to do I minus minus or plus plus. So plus plus because we're starting at zero and going up two, but not through three.
So let me go ahead now and make meow, after clearing my terminal, meow. And it's still just as correct, but it's a little better designed. Why? Because now if I want to change it from three to 30 times, for instance, I can change it there, I can recompile my code, I can do meow and done.
I don't have to copy and paste it 27 more times to get that effect. And I can even change what the word is by changing it in just one location. But it turns out there's other ways to do this, too.
And let me propose that we introduce you to what's called a for loop as well. So if you want to repeat something three times, you can absolutely take the while loop approach that we just saw, or you can do this. And this one takes a little more getting used to, but it kind of consolidates into one line all of the same logic.
There's three things to the left of the semicolon, in the middle of the two semicolons, and to the right of the semicolon. This is really the only other context we'll see semicolons, and it's weird. Normally it's been at the end of the line, now it's two of them in the middle of the line.
But this is the way humans decided years ago to do it. So what is this doing? Almost the same thing. It is going to initialize a variable called I to zero.
It's going to then check if it's less than three. It's then going to do whatever in the curly braces. And it's lastly going to increment I and repeat.
So just highlighting those in turn. First I is initialized to zero, just like before. Then this condition is checked.
This is a boolean expression. Yes or no, true or false will be its answer. And if I is less than three, which it should be, once it starts at zero, well, then we're going to go ahead and print out meow.
Then I is going to get incremented. So it starts at zero. It goes now to one.
At that point, the boolean expression is checked again so you don't keep changing I back to zero. That first step happens only once. But now you repeat through those three other highlights.
I check if I is less than three, it is so I print out meow. It then increments I. I check if I now two is less than three, it is I print out meow, I gets incremented I now check is I less than three.
No, it's not, because three is not less than three. And so the whole thing stops. And whatever code is below this curly brace, if any, starts executing.
Instead, just like in scratch, you break out of the loop and the puzzle piece is being hugged. Questions then about this alternative syntax for loops, aka A for loop. Sorry, say again? Yeah, can I explain again why it doesn't reset to zero? Honestly, just because, like, this was the syntax they chose this first part before.
The first semicolon is only executed once just because that's how it's designed. Everything else cycles again and again. And this is just an alternative syntax to using the slightly more lines of code.
It was like six lines of code using the while loop. Logically, it's the same thing. Programmers, once they get more comfortable, tend to prefer this because it just expresses all your same thoughts more succinctly.
That's all. Yeah. Okay, so let's just work this into my meow example.
Let me go back to the code here and notice indeed, if I highlight all these lines, I think we can tighten this up. Let me get rid of all of those and instead do four int I equals zero, and I'm saying equals. Most programmers would say gets.
So int I gets zero means assignment. The word get. Now I'm going to do I is less than three I plus plus.
Why? Well, a while loop expects in parentheses a boolean expression. And a boolean expression is again a yes no, a true false question. But if you want the answer to that question always to be yes or really always to be true turns out in C in a lot of languages.
Well, then just say true. Because true T-R-U-E is never going to change magically to false. I mean, it's just a special word in the programming language.
So by saying while true, it just means do the following forever. Another common paradigm before true and false became commonplace would be to do this instead change while one. You might see in online examples and texts and the like.
While one is really the same thing, any value that is zero is generally interpreted as false by a computer. Any value that is one or any other nonzero value is generally interpreted as true. And so this two would have the same effect.
Saying while true or while one generally speaking while true is perhaps a little clearer these days. Now, meowing forever is not a good thing. But suppose I did that by intent or by accident.
Well, let's try this. So here I'll go into my code. I'm going to get rid of my for loop and change my while loop to how about true? And in this case here, well, we'll keep it.
Let's do this. Make meow enter. And you'll see this use of undeclared identifier.
True. This is actually hinting at my mention that the old way was zero and one. Nowadays you could say true or false, but true and false are themselves special words that you have to include.
And it turns out if you want to use special boolean values like this, there's another header file we haven't seen called Standard Bool that essentially creates true and false as keywords. Alternatively, CS 50 includes that same file. So it's more common in CS 50 to see it like this.
Now, if I clear my terminal window and do make meow and then meow and hit enter. Well, unfortunately, this isn't the best thing to do infinitely when you're in the cloud using a browser. This is indeed a browser, just full screened here.
Namely an operating system called Linux. So I keep alluding verbally, of course, to Macs and PCs because almost all of us are running macOS or Windows on our desktops or laptops nowadays. But there's lots of other operating systems out there and one of the most popular one is called Linux.
And Linux is very often used on servers nowadays, companies that host email, companies that host websites or apps more generally, certain computer scientists or computer science students often like to brag that they run Linux just because that's a thing. But it is really just an alternative to macOS or Windows that provides you with both a Gui if you want it, but also and especially a command line environment. Now, fun fact windows and macOS do have terminal windows or the equivalent thereof.
And eventually you might use it on your own macro PC to solve some problem. But Linux is really known for, along with other operating systems, its command line environment which again I distinguished earlier from GUI as a command line interface or CLI. And that refers really to the terminal window.

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioSummaryTranscription;
