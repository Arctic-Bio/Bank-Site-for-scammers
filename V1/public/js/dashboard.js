document.addEventListener('DOMContentLoaded', function() {
  const questionText = document.getElementById('questionText');
  const answerInput = document.getElementById('answerInput');
  const submitAnswer = document.getElementById('submitAnswer');
  const errorMessage = document.getElementById('errorMessage');
  
  // Challenge types with associated data and generation functions
  const challengeTypes = [
    {
      name: "Pet Question",
      data: {
        attributes: ['Name', 'Color', 'Breed', 'Favorite Toy', 'Birthplace', 'Nickname'],
        numbers: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
        petTypes: ['Dog', 'Cat', 'Bird', 'Fish', 'Hamster', 'Rabbit']
      },
      generate: function(data) {
        const attr = data.attributes[Math.floor(Math.random() * data.attributes.length)];
        const num = data.numbers[Math.floor(Math.random() * data.numbers.length)];
        const pet = data.petTypes[Math.floor(Math.random() * data.petTypes.length)];
        return {
          question: `${attr} of your ${num} ${pet}?`,
          type: 'text'
        };
      }
    },
    {
      name: "Math Problem",
      data: {
        operations: ['+', '-', '*'],
        range: [1, 50]
      },
      generate: function(data) {
        const num1 = Math.floor(Math.random() * (data.range[1] - data.range[0] + 1)) + data.range[0];
        const num2 = Math.floor(Math.random() * (data.range[1] - data.range[0] + 1)) + data.range[0];
        const op = data.operations[Math.floor(Math.random() * data.operations.length)];
        return {
          question: `What is ${num1} ${op} ${num2}?`,
          type: 'text'
        };
      }
    },
    {
      name: "Matching Terms",
      data: {
        pairs: [
          { term: 'Capital of France', definition: 'Paris' },
          { term: 'Largest Planet', definition: 'Jupiter' },
          { term: 'Author of Romeo and Juliet', definition: 'Shakespeare' },
          { term: 'Chemical Symbol for Gold', definition: 'Au' },
          { term: 'First President of the USA', definition: 'George Washington' },
          { term: 'Fastest Land Animal', definition: 'Cheetah' },
          { term: 'Longest River', definition: 'Nile' },
          { term: 'Smallest Country', definition: 'Vatican City' }
        ]
      },
      generate: function(data) {
        const pair = data.pairs[Math.floor(Math.random() * data.pairs.length)];
        return {
          question: `What matches with "${pair.term}"?`,
          type: 'text'
        };
      }
    },
    {
      name: "Translation Task",
      data: {
        phrases: [
          { eng: 'Hello', target: 'Hola', lang: 'Spanish' },
          { eng: 'Thank you', target: 'Merci', lang: 'French' },
          { eng: 'Goodbye', target: 'Auf Wiedersehen', lang: 'German' },
          { eng: 'Please', target: 'Por favor', lang: 'Spanish' },
          { eng: 'Yes', target: 'Oui', lang: 'French' },
          { eng: 'No', target: 'Nein', lang: 'German' },
          { eng: 'Good morning', target: 'Buenos días', lang: 'Spanish' },
          { eng: 'Good night', target: 'Bonne nuit', lang: 'French' }
        ]
      },
      generate: function(data) {
        const phrase = data.phrases[Math.floor(Math.random() * data.phrases.length)];
        return {
          question: `Translate "${phrase.eng}" to ${phrase.lang}.`,
          type: 'text'
        };
      }
    },
    {
      name: "Historical Fact",
      data: {
        events: [
          { question: 'Year of American Independence?', answer: '1776' },
          { question: 'Who discovered America?', answer: 'Christopher Columbus' },
          { question: 'Year of the Moon Landing?', answer: '1969' },
          { question: 'Who was the first female Prime Minister of the UK?', answer: 'Margaret Thatcher' },
          { question: 'Which civilization built the pyramids of Giza?', answer: 'Ancient Egyptians' },
          { question: 'Year the Berlin Wall fell?', answer: '1989' }
        ]
      },
      generate: function(data) {
        const event = data.events[Math.floor(Math.random() * data.events.length)];
        return {
          question: event.question,
          type: 'text'
        };
      }
    },
    {
      name: "Science Question",
      data: {
        questions: [
          { question: 'What is the chemical formula for water?', answer: 'H2O' },
          { question: 'What planet is known as the Red Planet?', answer: 'Mars' },
          { question: 'What is the largest bone in the human body?', answer: 'Femur' },
          { question: 'What is the main gas found in the air we breathe?', answer: 'Nitrogen' },
          { question: 'What is the speed of light in vacuum (approx.)?', answer: '300,000 km/s' },
          { question: 'Who developed the theory of relativity?', answer: 'Albert Einstein' }
        ]
      },
      generate: function(data) {
        const q = data.questions[Math.floor(Math.random() * data.questions.length)];
        return {
          question: q.question,
          type: 'text'
        };
      }
    },
    {
      name: "Geography Quiz",
      data: {
        questions: [
          { question: 'What is the capital of Brazil?', answer: 'Brasília' },
          { question: 'Which country has the most islands in the world?', answer: 'Sweden' },
          { question: 'What is the largest country by land area?', answer: 'Russia' },
          { question: 'Which ocean is the smallest?', answer: 'Arctic Ocean' },
          { question: 'What is the capital of Japan?', answer: 'Tokyo' },
          { question: 'Which country is known as the Land of the Rising Sun?', answer: 'Japan' }
        ]
      },
      generate: function(data) {
        const q = data.questions[Math.floor(Math.random() * data.questions.length)];
        return {
          question: q.question,
          type: 'text'
        };
      }
    },
    {
      name: "Word Scramble",
      data: {
        words: ['Banking', 'Finance', 'Account', 'Deposit', 'Withdraw', 'Interest', 'Savings', 'Credit']
      },
      generate: function(data) {
        const word = data.words[Math.floor(Math.random() * data.words.length)];
        const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        return {
          question: `Unscramble this word: ${scrambled}`,
          type: 'text'
        };
      }
    },
    {
      name: "Riddle",
      data: {
        riddles: [
          { question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', answer: 'An echo' },
          { question: 'What has keys but can\'t open locks?', answer: 'A piano' },
          { question: 'What has a heart that doesn\'t beat?', answer: 'An artichoke' },
          { question: 'What comes once in a minute, twice in a moment, but never in a thousand years?', answer: 'The letter M' },
          { question: 'What can travel around the world while staying in a corner?', answer: 'A stamp' }
        ]
      },
      generate: function(data) {
        const riddle = data.riddles[Math.floor(Math.random() * data.riddles.length)];
        return {
          question: riddle.question,
          type: 'text'
        };
      }
    },
    {
      name: "Logic Puzzle",
      data: {
        puzzles: [
          { question: 'If all cats are animals, and some animals are dogs, are all cats dogs?', answer: 'No' },
          { question: 'If A is taller than B, and B is taller than C, who is the shortest?', answer: 'C' },
          { question: 'If today is Monday, what day is it in two days?', answer: 'Wednesday' },
          { question: 'If you have 3 apples and give away 2, how many do you have left?', answer: '1' },
          { question: 'If a car is red, and all red cars are fast, is this car fast?', answer: 'Yes' }
        ]
      },
      generate: function(data) {
        const puzzle = data.puzzles[Math.floor(Math.random() * data.puzzles.length)];
        return {
          question: puzzle.question,
          type: 'text'
        };
      }
    }
  ];
  
  // Function to generate a random challenge
  function generateChallenge() {
    const challenge = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
    return challenge.generate(challenge.data);
  }
  
  // Display initial challenge
  let currentChallenge = generateChallenge();
  let taskCount = 0;
  questionText.textContent = currentChallenge.question;
  
  // Handle answer submission
  submitAnswer.addEventListener('click', function() {
    const answer = answerInput.value.trim();
    if (answer === '') {
      errorMessage.textContent = 'Please provide an answer.';
      errorMessage.classList.remove('d-none');
    } else {
      // Log the answer (in a real implementation, this would be sent to the server)
      console.log(`Challenge: ${questionText.textContent}, Answer: ${answer}`);
      // Clear input and error message
      answerInput.value = '';
      errorMessage.classList.add('d-none');
      // Increment task counter
      taskCount++;
      if (taskCount >= 50) {
        // Display 404 error page after 50 tasks
        document.querySelector('main').innerHTML = `
          <div class="row justify-content-center">
            <div class="col-md-6 text-center">
              <div class="card">
                <div class="card-body p-5">
                  <h1 class="card-title mb-4" style="color: #004C7D;">404 - System Down</h1>
                  <p class="card-text">Oops, we're sorry, our systems are down right now, please try again later. Don't worry, none of your info has been saved.</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // Generate a new challenge
        currentChallenge = generateChallenge();
        questionText.textContent = currentChallenge.question;
      }
    }
  });
});
