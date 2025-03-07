const inputText = document.getElementById('input-text');
const taskList = document.getElementById('task-list');

function addTask() {
    if (inputText.value === '') {
        alert('Please enter a task');
    } else {
        let li = document.createElement('li');
        let array = inputText.value.split(' ');
        console.log(array);
        let newArr = [];
        array.forEach(element => {
            element = element.charAt(0).toUpperCase() + element.slice(1);
            newArr.push(element);
        })
        console.log(newArr);

        li.innerHTML = newArr.join(' ');
        li.style.backgroundColor = 'burlywood';
        li.style.borderRadius = '4px';
        taskList.appendChild(li); 
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        let penIcon = document.createElement('i');
        penIcon.classList.add('fa-solid', 'fa-pen');
        // penIcon.style.marginLeft = '180px';
        penIcon.style.cursor = 'pointer';
        penIcon.style.color = '#001f4a'; // Change color if needed
        li.appendChild(penIcon);
        

    }
    inputText.value = ''; 
    saveData()
}

taskList.addEventListener('click',function(e) {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData()
    }else if(e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData()
    }else if (e.target.classList.contains('fa-pen')) {
        let li = e.target.parentElement;
        let existingText = li.childNodes[0].textContent.trim(); // Get task text
        let deleteButton = li.querySelector("span"); // Store delete button
        let penIcon = e.target; // Store edit icon
    
        let input = prompt('Edit task', existingText);
        
        if (input) {
            li.innerHTML = ""; // Clear only text
            li.appendChild(document.createTextNode(input)); // Add new text
            li.appendChild(deleteButton); // Re-add the delete button
            li.appendChild(penIcon); // Re-add the edit icon
        }
        saveData()
    }
    
    
})


function saveData() {
    localStorage.setItem('data',taskList.innerHTML);
}

function showTask(){
    let data = localStorage.getItem('data');
    if(data){
        taskList.innerHTML = data;
    }else{
        taskList.innerHTML = '';
    }
}
 
showTask(); // Load tasks from local storage on page load.