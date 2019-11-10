document.addEventListener('DOMContentLoaded', function () {

    var dataName = document.querySelectorAll('.date-name');
    var taskName = document.querySelector('#task-name');
    var taskTime = document.querySelector('#task-time');
    var taskDue = document.querySelector('#task-due');
    var form = document.querySelector('#form-wrapper');

    function CreateNewTask() {
        var li = document.createElement('li');
        var taskNameTN = document.createTextNode(taskName.value);
        li.appendChild(taskNameTN);

        var eventsBox = document.createElement('p');
        eventsBox.classList.add('events');

        var circleIcon = document.createElement('i');
        circleIcon.classList.add('material-icons');
        circleIcon.classList.add('md-36');
        var circleIconTN = document.createTextNode('radio_button_unchecked');
        circleIcon.appendChild(circleIconTN);
        circleIcon.addEventListener('click', function () {
            if (this.firstChild.textContent === 'radio_button_unchecked') {
                this.firstChild.remove();
                var swap = document.createTextNode('check_circle_outline');
                this.appendChild(swap);
                deleteIcon.style.display = 'block';
            } else {
                this.firstChild.remove();
                var swap = document.createTextNode('radio_button_unchecked');
                this.appendChild(swap);
                deleteIcon.style.display = 'none';
            }
        })
        var deleteIcon = document.createElement('i');
        deleteIcon.classList.add('material-icons');
        deleteIcon.classList.add('md-36');
        var deleteIconTN = document.createTextNode('cancel');
        deleteIcon.style.display = 'none';
        deleteIcon.appendChild(deleteIconTN);
        deleteIcon.addEventListener('click', function() {
            this.parentElement.parentElement.remove();
            if (current.children.length === 0) {
                current.style.display = 'none';
            } 
        })

        eventsBox.appendChild(circleIcon);
        eventsBox.appendChild(deleteIcon);
        li.appendChild(eventsBox);

        if (taskTime.value.length === 5 || taskDue.value.length > 4) {
            var description = document.createElement('p');
            description.classList.add('details')
            if (taskTime.value.length === 5) {
                var spanTime = document.createElement('span');
                var timeIcon = document.createElement('i');
                timeIcon.classList.add('material-icons');
                var timeIconTN = document.createTextNode('schedule');
                timeIcon.appendChild(timeIconTN);
                var taskTimeTN = document.createTextNode(taskTime.value);
                spanTime.appendChild(timeIcon);
                spanTime.appendChild(taskTimeTN);
                description.appendChild(spanTime);
            }
            if (taskDue.value.length > 4) {
                var spanDue = document.createElement('span');
                var dueIcon = document.createElement('i');
                dueIcon.classList.add('material-icons');
                var dueIconTN = document.createTextNode('outlined_flag');
                dueIcon.appendChild(dueIconTN);
                var taskDueTN = document.createTextNode('Due: ' + taskDue.value);
                spanDue.appendChild(dueIcon);
                spanDue.appendChild(taskDueTN);
                description.appendChild(spanDue);
            }
            li.appendChild(description);
        }
        current.appendChild(li);
        current.style.display = 'block';
        taskName.value = '';
        taskTime.value = '';
        taskDue.value = '';
    }

    var tiles = document.querySelectorAll('.tile');
    var uls = document.querySelectorAll('ul')
    for (var i = 0; i < 7; i++) {
        uls[i].style.display = 'none';
    }
    var current = uls[0];
    var currentSelected = tiles[0];
    tiles[0].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[0].children.length > 0) {
            uls[0].style.display = 'block';
        }
        current = uls[0];

        currentSelected.classList.toggle('selected');
        tiles[0].classList.toggle('selected');
        currentSelected = tiles[0]
    })
    tiles[1].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[1].children.length > 0) {
            uls[1].style.display = 'block';
        }
        current = uls[1];

        currentSelected.classList.toggle('selected');
        tiles[1].classList.toggle('selected');
        currentSelected = tiles[1]
    })
    tiles[2].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[2].children.length > 0) {
            uls[2].style.display = 'block';
        }
        current = uls[2];

        currentSelected.classList.toggle('selected');
        tiles[2].classList.toggle('selected');
        currentSelected = tiles[2]
    })
    tiles[3].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[3].children.length > 0) {
            uls[3].style.display = 'block';
        }
        current = uls[3];

        currentSelected.classList.toggle('selected');
        tiles[3].classList.toggle('selected');
        currentSelected = tiles[3]
    })
    tiles[4].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[4].children.length > 0) {
            uls[4].style.display = 'block';
        }
        current = uls[4];

        currentSelected.classList.toggle('selected');
        tiles[4].classList.toggle('selected');
        currentSelected = tiles[4]
    })
    tiles[5].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[5].children.length > 0) {
            uls[5].style.display = 'block';
        }
        current = uls[5];

        currentSelected.classList.toggle('selected');
        tiles[5].classList.toggle('selected');
        currentSelected = tiles[5]
    })
    tiles[6].addEventListener('click', function () {
        current.style.display = 'none';
        if (uls[6].children.length > 0) {
            uls[6].style.display = 'block';
        }
        current = uls[6];

        currentSelected.classList.toggle('selected');
        tiles[6].classList.toggle('selected');
        currentSelected = tiles[6]
    })

    function Calendar() {
        var now = new Date();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        document.querySelector('#today-header').innerText = 'Today is ' + days[now.getDay()] + ' ' + now.getDate() + ' ' + months[(now.getMonth())];

        for (var i = 0; i < 7; i++) {
            var currentDate = new Date();
            currentDate.setDate(new Date().getDate() + i);
            dataName[i].innerHTML = days[currentDate.getDay()];
            document.querySelectorAll('.date')[i].innerHTML = currentDate.getDate();
            document.querySelectorAll('.month')[i].innerHTML = months[currentDate.getMonth()];
        }
    }
    Calendar();

    document.querySelector('.add-circle').addEventListener('click', function () {
        form.style.display = 'block';
        if (taskName.value.length > 5 && taskName.value.length < 50 && form.style.display === 'block') {
            CreateNewTask();
        }
    })
    document.querySelector('.cancel').addEventListener('click', function () {
        form.style.display = 'none';
    })
})
