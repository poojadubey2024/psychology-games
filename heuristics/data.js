// Content for "Shortcuts of the Mind" (heuristics + schemas).
// Edit text here; the game reads everything from this file.
// Images: web-sized copies live in  heuristics/img/sN/  as 1.jpg ... 5.jpg (story panels),
// mind.jpg and sheet.jpg. A missing image shows a "Picture coming soon" card.
// Use a story's "images" entry below only to mark a panel as missing (null).

window.GAME_DATA = {
  heuristics: {
    "Representativeness": { def: "Judging how likely something is by how closely it resembles a prototype, while ignoring base rates (how common each option really is).", people: "Amos Tversky & Daniel Kahneman (1972, 1974); Eleanor Rosch on prototypes (1975)" },
    "Availability": { def: "Judging how frequent or likely something is by how easily examples come to mind.", people: "Tversky & Kahneman (1973); Norbert Schwarz on ease of retrieval (1991)" },
    "Anchoring & adjustment": { def: "Starting from a first value or impression and adjusting too little away from it.", people: "Tversky & Kahneman (1974); Englich, Mussweiler & Strack (2006); Epley & Gilovich (2006)" },
    "Status quo": { def: "“What is, is good”: judging existing, older or default options as better than new ones.", people: "Samuelson & Zeckhauser (1988); Eidelman & Crandall (2010)" },
    "Affect": { def: "Letting a quick good or bad feeling stand in for a judgment of risk and benefit.", people: "Paul Slovic & Melissa Finucane (2000, 2002); Robert Zajonc (1980)" },
    "Recognition": { def: "If one option is recognised and the other is not, inferring that the recognised one is better or bigger.", people: "Daniel Goldstein & Gerd Gigerenzer (2002)" },
    "Simulation": { def: "Judging how likely or how upsetting an outcome is by how easily an alternative can be imagined.", people: "Kahneman & Tversky (1982); Neal Roese (1997)" },
    "Social proof": { def: "Treating what other people are doing as evidence of what is right.", people: "Robert Cialdini (1984); Solomon Asch (1951); Muzafer Sherif (1935)" },
    "Fluency": { def: "Judging things that are easy to process as truer, better or more competent.", people: "Hertwig et al. (2008); Daniel Oppenheimer (2006); Reber & Schwarz (1999)" },
    "Scarcity": { def: "Valuing things more when they seem rare or about to run out.", people: "Cialdini (1984); Worchel, Lee & Adewole (1975); Jack Brehm (1966)" }
  },

  schemas: {
    "Person (trait)": { def: "Beliefs about which traits go together in a person, like “what is beautiful is good”.", people: "Solomon Asch (1946); Dion, Berscheid & Walster (1972); Fiske & Taylor" },
    "Self": { def: "Beliefs about our own traits, built from past experience.", people: "Hazel Markus (1977)" },
    "Role": { def: "Expected traits and behaviour of people in a role or job, such as a librarian or a professor.", people: "Fiske & Taylor; Eleanor Rosch (prototypes)" },
    "Event (script)": { def: "The usual sequence of events in a situation, like a doctor's visit or a sale.", people: "Roger Schank & Robert Abelson (1977); Bower, Black & Turner (1979)" },
    "Group (stereotype)": { def: "Expected traits of the members of a social group.", people: "Gordon Allport (1954); Cuddy & Fiske (2002)" },
    "Causal": { def: "Beliefs about what kind of cause produces what kind of effect, like “big effects need big causes”.", people: "Harold Kelley (1972); Nisbett & Ross (1980); Spina et al. (2010)" },
    "Object & place": { def: "What a type of thing or place is like and worth: an old brand, a famous hospital, a rare item.", people: "Brewer & Treyens (1981); Frederic Bartlett (1932)" }
  },

  minds: ["Kahneman & Tversky", "Frederic Bartlett", "Gerd Gigerenzer", "Paul Slovic", "Fiske & Taylor", "Schank & Abelson", "Hazel Markus", "Eleanor Rosch", "Robert Cialdini"],

  stories: [
    {
      title: "The Quiet Neighbour", who: "Arjun", about: "Arjun, 34, new to an apartment building.",
      panels: [
        { kind: "Situation", text: "At the building's Diwali get-together, Arjun meets Meera. She is quiet and neatly dressed in a cardigan, and through her open door is a wall of books." },
        { kind: "Conversation", lines: [["Arjun", "So many books! Do you get to read a lot at work?"], ["Meera", "Not as much as I'd like."], ["Arjun", "Still, it must be peaceful there. Quiet all day."], ["Meera", "Quiet? Not really."]] },
        { kind: "Arjun's thought", text: "“Glasses, cardigan, every shelf in perfect order. I could tell the moment I saw those shelves.”" },
        { kind: "Feeling", text: "Pleased with himself, a little shy." },
        { kind: "Behaviour", text: "He puts her name forward for the building's new reading-room committee." }
      ],
      labelQ: "What did Arjun decide Meera is?",
      labels: ["Librarian", "Business manager", "Teacher", "Bookshop owner"], answer: "Librarian",
      labelHint: "Listen to what Arjun asks about Meera's work, and how he pictures her workplace.",
      heuristics: [
        ["Representativeness", "Arjun's mind lays Meera's traits over its picture of a librarian: quiet, neat, books. Match! How many more managers than librarians exist is never checked.", true],
        ["Availability", "No librarian memory pops up. He is comparing her to a picture, not counting examples.", false],
        ["Anchoring & adjustment", "There is no first number or first guess he adjusts from.", false],
        ["Status quo", "He isn't choosing between keeping something old and trying something new.", false]
      ],
      schemas: [
        ["Role", "The “librarian” blueprint: quiet, orderly, loves books. A role schema stores what people in a job are like.", true],
        ["Event (script)", "No sequence of events is being predicted.", false],
        ["Self", "Arjun is judging Meera, not himself.", false],
        ["Causal", "Nobody is asking what caused what.", false]
      ],
      hintH: "Arjun checked how well Meera fits a picture, not how common each job is.",
      hintS: "The picture in his head is of a job.",
      psychology: "Daniel Kahneman and Amos Tversky (1973, 1974) showed that people guess someone's job from how well a description matches the job's stereotype. In their “Steve” example, a shy, tidy man is judged a librarian rather than a farmer, though farmers are far more common. Eleanor Rosch (1975) showed categories are organised around prototypes; Fiske and Taylor call stored job prototypes role schemas.",
      reality: "Meera is a sales manager at a cement company. Sales managers far outnumber librarians.",
      images: { panels: ["1.jpg", "2.jpg", "3.jpg", null, "5.jpg"] }
    },
    {
      title: "The Outbreak Report", who: "Nisha", about: "Nisha, 41, editor at a city newspaper.",
      panels: [
        { kind: "Situation", text: "A report lands on Nisha's desk: a fever has killed 200 people in a nearby town. Officials list two possible sources: a new drug-resistant virus, or an ordinary virus spread through one leaking water pipe." },
        { kind: "Conversation", lines: [["Kabir", "Officials say the pipe theory is strong."], ["Nisha", "A pipe? For two hundred people? Find out what's new about this virus."], ["Kabir", "The lab hasn't found anything new yet."], ["Nisha", "Then keep digging."]] },
        { kind: "Nisha's thought", text: "“Two hundred families. Something this terrible doesn't come from a plumbing problem.”" },
        { kind: "Feeling", text: "Alarmed and urgent." },
        { kind: "Behaviour", text: "She clears the front page for a lab investigation and moves the pipe report to page 9." }
      ],
      labelQ: "What did Nisha decide caused the outbreak?",
      labels: ["A super-virus is to blame", "The pipe is to blame", "The panic is overblown", "We need more data"], answer: "A super-virus is to blame",
      labelHint: "Look at where Nisha sends her reporter to dig, and what she says about the pipe.",
      heuristics: [
        ["Representativeness", "Her mind matches the size of the cause to the size of the effect: a big tragedy should have a big villain. A small cause doesn't “look right”.", true],
        ["Affect", "She does feel alarm, but her choice rests on matching big to big, not on the feeling itself.", false],
        ["Availability", "She isn't recalling past outbreaks to judge how common this is.", false],
        ["Recognition", "Neither cause is more familiar to her by name.", false]
      ],
      schemas: [
        ["Causal", "“Like produces like”: big effects need big causes. A causal schema stores what kind of cause makes what kind of effect.", true],
        ["Group (stereotype)", "No social group is being judged.", false],
        ["Role", "Her judgment isn't about what an editor or official is like.", false],
        ["Person (trait)", "She isn't judging anyone's personality.", false]
      ],
      hintH: "She expected the cause to resemble the effect.",
      hintS: "Her belief is about what produces what.",
      psychology: "Richard Nisbett and Lee Ross (1980) described the “like causes like” belief behind many judgment errors. Roy Spina and colleagues (2010) found Canadian participants expected big effects to have big causes more strongly than Chinese participants, showing that culture shapes causal schemas. Harold Kelley (1972) introduced causal schemas; Tversky and Kahneman described representativeness.",
      reality: "A week later, the leaking pipe is confirmed as the source."
    },
    {
      title: "The Interview", who: "Vikram", about: "Vikram, 38, hiring manager at a startup.",
      panels: [
        { kind: "Situation", text: "Vikram is hiring a social media manager. Shobha, 58, arrives with a thick portfolio." },
        { kind: "Conversation", lines: [["Vikram", "Our team lives on Instagram and Slack. Would that be comfortable for you?"], ["Shobha", "I run three brand accounts right now."], ["Vikram", "Great, great. And we'd give you training, of course. Whatever you need."]] },
        { kind: "Vikram's thought", text: "“Reading glasses on a chain, a printed portfolio. This role moves so fast.”" },
        { kind: "Feeling", text: "Uneasy and doubtful." },
        { kind: "Behaviour", text: "He leaves her portfolio unopened, writes “needs upskilling?” in his notes, and calls the 24-year-old candidate for round two." }
      ],
      labelQ: "What did Vikram decide about Shobha?",
      labels: ["Not tech-savvy", "Highly experienced", "Overqualified", "Perfect fit"], answer: "Not tech-savvy",
      labelHint: "Notice the offer Vikram makes right after Shobha mentions her brand accounts.",
      heuristics: [
        ["Representativeness", "His mind compares Shobha to a stored “older person” prototype: grey hair, reading glasses, so “bad with tech”. The many older adults who use social media daily never come to mind.", true],
        ["Availability", "If he were recalling his father fumbling with a phone, this would be availability. Here he is matching her to a group picture.", false],
        ["Status quo", "He isn't sticking with an existing option over a new one.", false],
        ["Anchoring & adjustment", "No first number pulls his rating.", false]
      ],
      schemas: [
        ["Group (stereotype)", "A group schema says what “people over 55” are like and applies it to one individual.", true],
        ["Person (trait)", "A person schema links traits inside one individual. Here the traits come from her age group.", false],
        ["Event (script)", "No expected sequence of events is involved.", false],
        ["Self", "Vikram is judging Shobha, not himself.", false]
      ],
      hintH: "He judged her by how well she fits a picture of her age group.",
      hintS: "The picture belongs to a whole group of people.",
      psychology: "Gordon Allport (1954) described stereotypes as group schemas applied to individuals. Amy Cuddy, Michael Norton and Susan Fiske (2005) found older people are stereotyped as warm but less competent. The same mechanism drove a real case: in the 2010 debate over an Islamic cultural centre near Ground Zero, opponents judged all Muslims against a terrorist prototype, ignoring a base rate of well over a billion peaceful Muslims.",
      reality: "Shobha's portfolio includes a campaign that reached 2 million people."
    },
    {
      title: "The Holiday Flight", who: "Priya", about: "Priya, 36, planning a family trip to Goa.",
      panels: [
        { kind: "Situation", text: "All week the TV news has replayed footage of a plane crash abroad. The family's flight to Goa leaves on Friday." },
        { kind: "Conversation", lines: [["Rohan", "Tickets are confirmed, Friday 6 a.m."], ["Priya", "Did you see the news again tonight? That's the third time they showed it."], ["Rohan", "That was another country."], ["Priya", "Let's just check how long the drive is."]] },
        { kind: "Priya's thought", text: "“I can still see that wing lying in the field. Two little kids on board. I keep picturing it.”" },
        { kind: "Feeling", text: "A knot in her stomach; she can't sleep." },
        { kind: "Behaviour", text: "She cancels the tickets and packs the car for a 14-hour overnight drive." }
      ],
      labelQ: "What did Priya decide about flying?",
      labels: ["Flying is too dangerous", "Driving is cheaper", "Flying is the safest", "The train is faster"], answer: "Flying is too dangerous",
      labelHint: "What does Priya keep replaying, and what does she suggest instead?",
      heuristics: [
        ["Availability", "Her mind searches “plane danger” and instantly finds a week of crash footage. Easy to recall, so it must be common. Thousands of quiet road accidents never made the news, so they never surface.", true],
        ["Affect", "Fear is present, but her judgment comes from how quickly crash images come to mind.", false],
        ["Representativeness", "She isn't comparing her flight to a prototype.", false],
        ["Simulation", "She isn't replaying “if only” versions of a past event.", false]
      ],
      schemas: [
        ["Event (script)", "A vivid “plane crash” script (boarding, turbulence, screams, wreckage) primed by the news and easy to replay.", true],
        ["Self", "She isn't forming a belief about herself.", false],
        ["Group (stereotype)", "No social group is being judged.", false],
        ["Role", "Pilots and crew don't enter her judgment.", false]
      ],
      hintH: "She judged risk by how quickly scary examples came to mind.",
      hintS: "Her mind replayed a familiar sequence of events.",
      psychology: "Tversky and Kahneman (1973) showed people judge frequency by ease of recall. Sarah Lichtenstein, Paul Slovic and colleagues (1978) found people overestimate dramatic, well-publicised causes of death. Gerd Gigerenzer (2006) estimated about 1,500 extra US road deaths in the year after 9/11 as people drove instead of flying. Roger Schank and Robert Abelson (1977) described event scripts.",
      reality: "Per kilometre travelled, road travel is far riskier than flying."
    },
    {
      title: "Six Creative Things", who: "Riya", about: "Riya, 20, a college student.",
      panels: [
        { kind: "Situation", text: "The design club's application form asks: “List 6 times you were creative.”" },
        { kind: "Conversation", lines: [["Tara", "Done with the form? Mine asked for two examples, took me a minute!"], ["Riya", "Mine wants six."], ["Tara", "So? You draw all the time."], ["Riya", "I've been staring at it for twenty minutes."]] },
        { kind: "Riya's thought", text: "“The college poster, the Diwali rangoli, and then? Why is this so hard? It shouldn't be this hard.”" },
        { kind: "Feeling", text: "Frustrated, then deflated." },
        { kind: "Behaviour", text: "She closes the laptop and pushes her sketchbook into a drawer. The deadline passes." }
      ],
      labelQ: "What did Riya decide about herself?",
      labels: ["Not creative", "Very creative", "Too busy", "Overconfident"], answer: "Not creative",
      labelHint: "How does Riya explain to herself why the list is so hard to fill?",
      heuristics: [
        ["Availability", "Her mind treats the struggle to find examples as evidence: hard to recall, so it must be rare in her.", true],
        ["Anchoring & adjustment", "The number 6 isn't a starting value she adjusts from. It's the effort of recalling that misleads her.", false],
        ["Representativeness", "She isn't matching herself to a prototype of a designer.", false],
        ["Status quo", "She isn't defending an existing option.", false]
      ],
      schemas: [
        ["Self", "Her self-schema, “what I'm like”, gets updated from how easily self-memories come.", true],
        ["Person (trait)", "A person schema is about other people's traits.", false],
        ["Role", "She isn't judging what club members are like.", false],
        ["Event (script)", "No expected sequence of events is involved.", false]
      ],
      hintH: "What mattered was how hard the remembering felt.",
      hintS: "The belief is about Riya herself.",
      psychology: "Norbert Schwarz and colleagues (1991) asked people to recall 6 or 12 times they had been assertive. Those asked for 12 found it harder and rated themselves less assertive: the ease of recall mattered more than the number recalled. Hazel Markus (1977) introduced self-schemas.",
      reality: "Tara rated herself very creative and applied, though Riya's sketchbook is stronger."
    },
    {
      title: "The Late Teammate", who: "Rahul", about: "Rahul, 29, a project lead.",
      panels: [
        { kind: "Situation", text: "Rahul's teammate Aman walks into a client meeting 40 minutes late." },
        { kind: "Conversation", lines: [["Aman", "Sorry, the metro stopped between stations for half an hour."], ["Rahul", "Okay. Still, the client was waiting."], ["Aman", "I left at my usual time."], ["Rahul", "Maybe the usual time needs to change."]] },
        { kind: "Rahul's thought", text: "“Shirt untucked, laptop half-open, rushing in. And in front of the client.”" },
        { kind: "Feeling", text: "Irritated and embarrassed." },
        { kind: "Behaviour", text: "In Aman's quarterly review, he gives 2 out of 5 for reliability." }
      ],
      labelQ: "What did Rahul decide about Aman?",
      labels: ["Careless", "Unlucky", "Hardworking", "Stuck in traffic"], answer: "Careless",
      labelHint: "Look at how Rahul answers the metro excuse, and the rating he gives.",
      heuristics: [
        ["Anchoring & adjustment", "His mind anchors on a trait, “careless”, first. The metro news moves him only a little from that starting point.", true],
        ["Representativeness", "He isn't matching Aman to a category prototype.", false],
        ["Availability", "He isn't counting remembered examples of Aman being late.", false],
        ["Status quo", "No old-versus-new choice is being made.", false]
      ],
      schemas: [
        ["Person (trait)", "A trait schema, “late means careless means unreliable”, supplies the anchor.", true],
        ["Group (stereotype)", "Aman is judged as an individual, not as a group member.", false],
        ["Event (script)", "The meeting's usual sequence isn't the issue.", false],
        ["Object & place", "No object or place is being judged.", false]
      ],
      hintH: "He started from one judgment and barely moved.",
      hintS: "The starting point was a belief about Aman's character.",
      psychology: "Edward Jones and Victor Harris (1967) found people explain behaviour by personality even when the situation forced it; Lee Ross (1977) named this the fundamental attribution error. George Quattrone (1982) and Daniel Gilbert showed it works like anchoring: we anchor on a trait and adjust too little for the situation. Solomon Asch (1946) showed how one trait colours a whole impression.",
      reality: "The breakdown made the evening news; hundreds of commuters were stranded."
    },
    {
      title: "The Big Sale", who: "Sana", about: "Sana, 27, shopping at a mall.",
      panels: [
        { kind: "Situation", text: "At a mall, a kurta's tag reads “MRP ₹4,000, today ₹1,999”." },
        { kind: "Conversation", lines: [["Sister", "Do you even need another kurta?"], ["Sana", "Look at the tag though!"], ["Sister", "It's nice, but two thousand is two thousand."], ["Sana", "Four thousand, Didi. Four!"]] },
        { kind: "Sana's thought", text: "“I'm basically getting one free. Mummy will be so impressed.”" },
        { kind: "Feeling", text: "Excited, the thrill of a find." },
        { kind: "Behaviour", text: "She buys two and posts the receipt on the family group chat." }
      ],
      labelQ: "What did Sana decide about the kurta?",
      labels: ["A great bargain", "Overpriced", "Poor quality", "Not my style"], answer: "A great bargain",
      labelHint: "Which number does Sana keep pointing to?",
      heuristics: [
        ["Anchoring & adjustment", "₹4,000 lands first and becomes the yardstick. ₹1,999 is judged against it, not against what the kurta is worth.", true],
        ["Scarcity", "“Only 2 left” would be scarcity. Here the pull comes from the first price.", false],
        ["Social proof", "She isn't copying what other shoppers do.", false],
        ["Status quo", "She isn't choosing an old, familiar option over a new one.", false]
      ],
      schemas: [
        ["Event (script)", "The “sale” script: a big crossed-out price, then a smaller one, means a deal. Following the script feels like winning.", true],
        ["Person (trait)", "No one's personality is being judged.", false],
        ["Self", "She isn't forming a belief about herself.", false],
        ["Causal", "She isn't asking what caused what.", false]
      ],
      hintH: "The first number she saw became the yardstick.",
      hintS: "Her mind followed a familiar shopping routine.",
      psychology: "Tversky and Kahneman (1974) showed a random spin of a wheel shifted people's estimates. Gregory Northcraft and Margaret Neale (1987) found listing prices anchored even experienced estate agents. Birte Englich, Thomas Mussweiler and Fritz Strack (2006) showed a dice roll anchored experienced judges' sentences. Dan Ariely, George Loewenstein and Drazen Prelec (2003) found the last digits of people's ID numbers shifted what they would pay.",
      reality: "The shop next door sells the same kurta at ₹1,200 every day."
    },
    {
      title: "Since 1955", who: "Joseph", about: "Joseph, 72, a retired schoolteacher.",
      panels: [
        { kind: "Situation", text: "At a grocery sampling counter, two mango pickles sit side by side. One jar says “Since 1955”, the other “New! Est. 2023”." },
        { kind: "Conversation", lines: [["Assistant", "Same price, sir. Try both."], ["Joseph", "Hmm. This one has more depth."], ["Assistant", "The new one uses the same masala, actually."], ["Joseph", "Some things you can't rush."]] },
        { kind: "Joseph's thought", text: "“My mother would have bought from a company like this. Seventy years. People don't keep buying something for nothing.”" },
        { kind: "Feeling", text: "Warm and reassured." },
        { kind: "Behaviour", text: "He buys three jars of the older brand and recommends it at his senior citizens' club." }
      ],
      labelQ: "What did Joseph decide about the pickles?",
      labels: ["The old brand is better", "They taste the same", "The new one is better", "Too expensive"], answer: "The old brand is better",
      labelHint: "Which jar does Joseph say has “more depth”?",
      heuristics: [
        ["Status quo", "“What is, is good.” Long existence stands in for quality, so the older pickle even tastes better.", true],
        ["Recognition", "He has never heard of either brand. The label's age, not familiarity, sways him.", false],
        ["Anchoring & adjustment", "No first number pulls his judgment.", false],
        ["Affect", "The warm feeling follows from “older is better”; it isn't the shortcut itself.", false]
      ],
      schemas: [
        ["Object & place", "An object schema: long-standing products are “tried and true”.", true],
        ["Event (script)", "No expected sequence of events is involved.", false],
        ["Role", "He isn't judging what people in a job are like.", false],
        ["Group (stereotype)", "No social group is being judged.", false]
      ],
      hintH: "He trusted whatever has been around longest.",
      hintS: "His belief is about a kind of product.",
      psychology: "Scott Eidelman, Jennifer Pattershall and Christian Crandall (2010) found people rated the same chocolate tastier when told it had been sold for 70 years rather than 3, and rated acupuncture more effective the older they were told it was. William Samuelson and Richard Zeckhauser (1988) showed people stick with existing options. Kahneman, Jack Knetsch and Richard Thaler (1991) linked this to loss aversion.",
      reality: "Both pickles come from the same factory, made to the same recipe."
    },
    {
      title: "The Tower Next Door", who: "Kavya", about: "Kavya, 45, a homemaker and resident-association member.",
      panels: [
        { kind: "Situation", text: "A mobile phone tower goes up on the neighbouring building's roof." },
        { kind: "Conversation", lines: [["Mr. Pillai", "At least the call drops will stop now."], ["Kavya", "At what cost? It hums all night."], ["Mr. Pillai", "Has anyone said it's harmful?"], ["Kavya", "Do they need to? It's pointing right at the children's room."]] },
        { kind: "Kavya's thought", text: "“That metal thing, beaming who-knows-what through our walls every second. My skin crawls just looking at it.”" },
        { kind: "Feeling", text: "Dread." },
        { kind: "Behaviour", text: "She starts a petition to remove the tower and collects 80 signatures." }
      ],
      labelQ: "What did Kavya decide about the tower?",
      labels: ["High risk, no benefit", "Safe and useful", "Needs testing first", "Ugly but harmless"], answer: "High risk, no benefit",
      labelHint: "Kavya questions both the cost and the need. What does that add up to?",
      heuristics: [
        ["Affect", "A bad gut feeling about “radiation” paints the tower as high-risk and low-benefit at once. Feeling sets both.", true],
        ["Availability", "She isn't recalling cases of people harmed by towers.", false],
        ["Representativeness", "She isn't matching the tower to a prototype.", false],
        ["Simulation", "She isn't imagining “if only” alternatives to a past event.", false]
      ],
      schemas: [
        ["Causal", "“Invisible radiation causes cancer”: a causal schema linking an unseen force to a feared disease.", true],
        ["Self", "She isn't forming a belief about herself.", false],
        ["Role", "No job or role is being judged.", false],
        ["Group (stereotype)", "No social group is being judged.", false]
      ],
      hintH: "One feeling decided both the risk and the benefit.",
      hintS: "Her belief links an unseen cause to an illness.",
      psychology: "Robert Zajonc (1980) argued feelings come first and fast (“preferences need no inferences”). Melissa Finucane, Ali Alhakami, Paul Slovic and Stephen Johnson (2000) found that when people feel bad about a technology, they rate it both high in risk and low in benefit. Slovic named this the affect heuristic. Harold Kelley (1972) described causal schemas.",
      reality: "The WHO has found no established health effects from the low-level radio waves of phone towers, and the street's call signal drops once the tower goes."
    },
    {
      title: "The Famous Hospital", who: "Dev", about: "Dev, 32, whose mother needs knee surgery.",
      panels: [
        { kind: "Situation", text: "Dev's mother needs knee surgery, and he is choosing a hospital." },
        { kind: "Conversation", lines: [["Mother", "Dr. Mehta's clinic near the market does only knees, beta. Mrs. Iyer went there."], ["Dev", "Never heard of it."], ["Mother", "The other one has a two-month wait."], ["Dev", "Ma, it's City Hospital. It's on every billboard."]] },
        { kind: "Dev's thought", text: "“If something went wrong at some place I'd never heard of, I'd never forgive myself.”" },
        { kind: "Feeling", text: "Protective and under pressure." },
        { kind: "Behaviour", text: "He books City Hospital, pays the higher fee, and waits two months." }
      ],
      labelQ: "What did Dev decide about the hospitals?",
      labels: ["The famous one is better", "Both are equal", "The small one is better", "Too costly"], answer: "The famous one is better",
      labelHint: "What does Dev say about each hospital's name?",
      heuristics: [
        ["Recognition", "One name rings a bell, the other doesn't. His mind reads “I know it” as “it's better” and stops searching.", true],
        ["Fluency", "Fluency is about how easily a name is processed. Here it's whether he recognises it at all.", false],
        ["Availability", "He isn't estimating how often something happens.", false],
        ["Status quo", "Neither hospital is his current or default choice.", false]
      ],
      schemas: [
        ["Object & place", "A place schema: big, famous hospitals are the best hospitals.", true],
        ["Person (trait)", "No one's personality is being judged.", false],
        ["Event (script)", "No expected sequence of events is involved.", false],
        ["Group (stereotype)", "No social group is being judged.", false]
      ],
      hintH: "He picked the name he knew.",
      hintS: "His belief is about a kind of place.",
      psychology: "Daniel Goldstein and Gerd Gigerenzer (2002) asked which US city is larger, San Diego or San Antonio. German students, who had heard only of San Diego, did better than American students. Recognition is a smart shortcut when fame tracks quality, and a trap when it doesn't. William Brewer and James Treyens (1981) showed place schemas shape what we expect and remember.",
      reality: "Dr. Mehta's clinic is a specialist knee centre with better success rates."
    },
    {
      title: "Two Minutes", who: "Aisha", about: "Aisha, 26, a bank clerk who commutes by local train.",
      panels: [
        { kind: "Situation", text: "Aisha reaches the platform just as the 8:10 pulls out. Her friend Neel, on another line, also missed his train." },
        { kind: "Conversation", lines: [["Neel", "You missed it too? I missed mine by half an hour, whatever."], ["Aisha", "Two minutes, Neel. Two."], ["Neel", "Same result, na? We're both late."], ["Aisha", "It's not the same."]] },
        { kind: "Aisha's thought", text: "“If I hadn't stopped for that chai. If the auto had taken the flyover. I'd be sitting on it right now.”" },
        { kind: "Feeling", text: "A sharp sting of regret that stays all morning." },
        { kind: "Behaviour", text: "She skips her morning chai for the rest of the month." }
      ],
      labelQ: "What did Aisha decide about missing the train?",
      labels: ["I should have made it", "I never had a chance", "The train left early", "No big deal"], answer: "I should have made it",
      labelHint: "Compare Aisha's “two minutes” with Neel's half an hour.",
      heuristics: [
        ["Simulation", "Her mind easily plays a “made it” version of the morning. The easier the alternative is to imagine, the worse the real outcome feels.", true],
        ["Anchoring & adjustment", "“Two minutes” isn't a starting number she adjusts from; it makes an alternative easy to picture.", false],
        ["Availability", "She isn't judging how often trains are missed.", false],
        ["Affect", "Regret is the result here, not the shortcut that produced it.", false]
      ],
      schemas: [
        ["Event (script)", "Her commute script (chai, auto, platform) gives her ready steps to rewrite one by one.", true],
        ["Self", "She isn't forming a belief about what kind of person she is.", false],
        ["Group (stereotype)", "No social group is being judged.", false],
        ["Object & place", "No object or place is being judged.", false]
      ],
      hintH: "How bad it feels depends on how easily she can imagine it going differently.",
      hintS: "She rewinds a familiar routine step by step.",
      psychology: "Kahneman and Tversky (1982) described Mr. Crane and Mr. Tees, who both missed flights, one by 30 minutes and one by 5. Almost everyone said Mr. Tees would be more upset, because it is easier to imagine catching the plane. Victoria Medvec, Scott Madey and Thomas Gilovich (1995) found Olympic bronze medallists looked happier than silver medallists. Neal Roese (1997) studied such “if only” counterfactual thinking.",
      reality: "Both friends were equally late, yet the one who “nearly” made it felt far worse."
    },
    {
      title: "The Long Queue", who: "Karan", about: "Karan, 23, in Kolkata for his first work conference.",
      panels: [
        { kind: "Situation", text: "Looking for dinner, Karan and a colleague find two biryani shops side by side. One has a queue of about 40 people; the other is nearly empty." },
        { kind: "Conversation", lines: [["Meghna", "The empty one has 4.6 stars on the app."], ["Karan", "Then why is nobody in it?"], ["Meghna", "Maybe people eat late here."], ["Karan", "Look at that line, though."]] },
        { kind: "Karan's thought", text: "“Those people look like they're from around here. They must know something we don't.”" },
        { kind: "Feeling", text: "Curious, with a fear of missing out." },
        { kind: "Behaviour", text: "He joins the queue and waits 45 minutes." }
      ],
      labelQ: "What did Karan decide about the two shops?",
      labels: ["The crowded shop is better", "The empty shop is better", "They're the same", "Too hungry to wait"], answer: "The crowded shop is better",
      labelHint: "What is Karan looking at when he makes up his mind?",
      heuristics: [
        ["Social proof", "His mind reads the crowd as evidence: if so many people chose it, it must be good.", true],
        ["Scarcity", "Nothing is running out. The pull comes from the crowd, not from rarity.", false],
        ["Recognition", "He has heard of neither shop.", false],
        ["Representativeness", "He isn't matching the shop to a prototype.", false]
      ],
      schemas: [
        ["Group (stereotype)", "“Locals know the best food”: a group schema that turns the crowd into trusted experts.", true],
        ["Event (script)", "The steps of ordering and eating aren't what decides it.", false],
        ["Self", "He isn't forming a belief about himself.", false],
        ["Role", "No job or role is being judged.", false]
      ],
      hintH: "He let the crowd decide for him.",
      hintS: "His belief is about what a whole group of people knows.",
      psychology: "Muzafer Sherif (1935) showed people's judgments drift towards a group's. Solomon Asch (1951) found that about three in four people went along with an obviously wrong group answer at least once. Stanley Milgram, Leonard Bickman and Lawrence Berkowitz (1969) found that the more people stood looking up at a building, the more passers-by stopped to look too. Robert Cialdini (1984) named this social proof.",
      reality: "The queue formed after a food blogger posted a video that afternoon. Both shops have nearly the same ratings."
    },
    {
      title: "The Clear Adviser", who: "Neha", about: "Neha, 50, a school principal planning her retirement savings.",
      panels: [
        { kind: "Situation", text: "Neha meets two financial advisers. Mr. Kapoor uses simple words and big, clean slides. Mr. Rao talks in jargon over a small-print spreadsheet." },
        { kind: "Conversation", lines: [["Mr. Kapoor", "Simple: you save, it grows, you relax."], ["Neha", "Now that I understand!"], ["Her son", "But Ma, Mr. Rao's plan had lower fees."], ["Neha", "I couldn't follow a word he said."]] },
        { kind: "Neha's thought", text: "“With Mr. Kapoor, my head didn't hurt for once. It all just flowed.”" },
        { kind: "Feeling", text: "Relieved and at ease." },
        { kind: "Behaviour", text: "She signs with Mr. Kapoor that afternoon." }
      ],
      labelQ: "What did Neha decide about the advisers?",
      labels: ["Mr. Kapoor is more capable", "Mr. Rao is more capable", "Both are equal", "Need a third opinion"], answer: "Mr. Kapoor is more capable",
      labelHint: "Whose explanation “just flowed” for Neha, and whom does she sign with?",
      heuristics: [
        ["Fluency", "Easy to follow feels like true and competent. The ease is in her own processing, not in the quality of his plan.", true],
        ["Recognition", "She knows both names equally well.", false],
        ["Status quo", "Neither adviser is her current or default choice.", false],
        ["Anchoring & adjustment", "No first number is pulling her choice.", false]
      ],
      schemas: [
        ["Person (trait)", "An implicit personality theory: someone who speaks clearly must also be smart and honest.", true],
        ["Self", "She isn't forming a belief about herself.", false],
        ["Event (script)", "No expected sequence of events is involved.", false],
        ["Causal", "She isn't asking what caused what.", false]
      ],
      hintH: "How easy it felt to follow mattered more than the numbers.",
      hintS: "Her belief links one trait in a person to others.",
      psychology: "Rolf Reber and Norbert Schwarz (1999) found statements printed in easy-to-read colours were judged more true. Daniel Oppenheimer (2006) found needlessly complex words made writers seem less intelligent. Adam Alter and Oppenheimer (2006) found shares with easy-to-say names did better in their first days of trading. Ralph Hertwig and colleagues (2008) described the fluency heuristic.",
      reality: "Mr. Kapoor's plan charges nearly double the fees for similar returns."
    },
    {
      title: "Only 3 Left", who: "Ishaan", about: "Ishaan, 19, a college student.",
      panels: [
        { kind: "Situation", text: "Late at night, Ishaan is browsing sneakers online. A red banner on one pair reads “Only 3 left!”" },
        { kind: "Conversation", lines: [["Zaid", "Didn't you want the blue ones?"], ["Ishaan", "These are fine too."], ["Zaid", "Six thousand rupees for “fine”?"], ["Ishaan", "Bro. Three."]] },
        { kind: "Ishaan's thought", text: "“If I close this tab and they're gone tomorrow, I'll hate myself.”" },
        { kind: "Feeling", text: "Rushed, heart racing." },
        { kind: "Behaviour", text: "He buys them in 40 seconds without checking the size chart." }
      ],
      labelQ: "What did Ishaan decide about the sneakers?",
      labels: ["Must buy now", "Not worth the price", "Wait for a sale", "Get the blue ones"], answer: "Must buy now",
      labelHint: "What does Ishaan say when Zaid questions the price?",
      heuristics: [
        ["Scarcity", "“Almost gone” makes the shoes feel more valuable and the choice more urgent.", true],
        ["Social proof", "No crowd is guiding his choice.", false],
        ["Anchoring & adjustment", "He isn't comparing the price to a first price.", false],
        ["Availability", "He isn't judging how often something happens.", false]
      ],
      schemas: [
        ["Object & place", "An object schema: rare things are valuable things.", true],
        ["Person (trait)", "No one's personality is being judged.", false],
        ["Group (stereotype)", "No social group is being judged.", false],
        ["Causal", "He isn't asking what caused what.", false]
      ],
      hintH: "He wanted them more because there seemed to be so few.",
      hintS: "His belief is about what makes a thing valuable.",
      psychology: "Stephen Worchel, Jerry Lee and Akanbi Adewole (1975) found the same cookies were rated more desirable when taken from a jar holding 2 than from a jar holding 10. Jack Brehm (1966) explained that a threat to our freedom to choose makes us want the option more (reactance). Robert Cialdini (1984) listed scarcity among the key principles of influence.",
      reality: "The next week the same pair is restocked, and the “Only 3 left!” banner appears on almost every product on the site."
    }
  ]
};
