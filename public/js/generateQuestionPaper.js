AOS.init({
  easing: 'ease-in-out',
  duration: 1000,
  once: true,  // trigger animation once per element
});
   
   
   document.getElementById('numQuestions').addEventListener('change', function() {
        let numQuestions = parseInt(this.value);
        let questionSection = document.getElementById('questionSection');
        questionSection.innerHTML = ''; // Clear previous questions

        for (let i = 0; i < numQuestions; i++) {
            let questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');
            
            let questionTypeSelect = document.createElement('select');
            questionTypeSelect.classList.add('question-type');
            questionTypeSelect.innerHTML = `
                <option value="MCQ">MCQ</option>
                <option value="Written">Written</option>
            `;
            questionDiv.appendChild(questionTypeSelect);

            let questionType = document.createElement('input');
            questionType.type = 'text';
            // questionType.setAttribute(id, `questionTopicName{i + 1}`);
            questionType.placeholder = `Enter Topic Name ${i + 1}`;
            questionDiv.appendChild(questionType);

            let marksInput = document.createElement('input');
            marksInput.type = 'number';
            marksInput.placeholder = 'Marks';
            marksInput.classList.add('marks');
            questionDiv.appendChild(marksInput);

            questionSection.appendChild(questionDiv);
        }
    });
    document.addEventListener('DOMContentLoaded', async function() {
        // /mySubject/GetSubjects
        const dropdown = document.getElementById('subjectName');

let response = await fetch('/mySubject/GetSubjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  let data = await response.json();
        for (const subject in data) {
            if(subject=="subjects"){
                for (const sub of data.subjects) {
                    const option = document.createElement('option');
                    option.value = sub.id;
                    option.textContent = sub.subjectName;
                    dropdown.appendChild(option);
                }
            }
        }
    
    })
    // .catch(error => {
    //     console.error('Error fetching subjects:', error);
    // });
    

    document.getElementById("questionPaperForm").addEventListener('submit', async function (e) {
        e.preventDefault();

        let QuestionDetailForBackend=[];
        const questionsDetails = document.querySelectorAll('.question-item')
        questionsDetails.forEach((question, index) => {
            let questionType = question.querySelector('.question-type').value;
            let questionTopic = question.querySelector('input[type="text"]').value;
            let marks = question.querySelector('.marks').value;
            let questionData = {
                questionType: questionType,
                questionTopic: questionTopic,
                marks: marks
            };
            QuestionDetailForBackend.push(questionData);
        })

        let collagename = document.getElementById("collegeName").value;
        let subjectname = document.getElementById("subjectName").value;
        let subjectcode = document.getElementById("subjectCode").value;
        let examdate = document.getElementById("examDate").value;
        let examhours = document.getElementById("examHours").value;
        let examminutes = document.getElementById("examMinutes").value;
        let totalmarks = document.getElementById("totalMarks").value;
        let instruction = document.getElementById("instructions").value;
        let questiondetailforBackend = QuestionDetailForBackend;

        const data={
            collageName:collagename,
            subjectName:subjectname,
            subjectCode:subjectcode,
            examDate:examdate,
            examHour:examhours,
            examMinutes:examminutes,
            totalMarks:totalmarks,
            instructions:instruction,
            questionDetailForBackend:questiondetailforBackend
        }

        console.log("Data",data)

        await fetch('/generate/generateQuestionPaper', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             data
            })
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert("Generating Question Paper")
              }
              else {
                alert("Something went wrong while generating Question Paper.")
              }
            })        
    })