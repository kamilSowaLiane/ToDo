document.addEventListener('DOMContentLoaded', function () {

    var dataName = document.querySelectorAll('.date-name');
    var taskName = document.querySelector('#task-name');
    var taskTime = document.querySelector('#task-time');
    var taskDue = document.querySelector('#task-due');
    var taskDesc = document.querySelector('#task-description');
    var taskPrio = document.querySelector('select');

    function CreateNewTask() {
        var li = document.createElement('li');
        var taskNameTN = document.createTextNode(taskName.value);
        li.appendChild(taskNameTN);

        var circleIcon = document.createElement('i');
        circleIcon.classList.add('material-icons');
        circleIcon.classList.add('md-36');
        circleIcon.classList.add('done');
        var circleIconTN = document.createTextNode('radio_button_unchecked');
        circleIcon.appendChild(circleIconTN);
        circleIcon.addEventListener('click', function () {
            if (this.firstChild.textContent === 'radio_button_unchecked') {
                this.firstChild.remove();
                var swap = document.createTextNode('check_circle_outline');
                this.appendChild(swap);
                deleteIcon.style.display = 'block';
                this.parentElement.style.backgroundColor = '#f3e5f5';
            } else {
                this.firstChild.remove();
                var swap = document.createTextNode('radio_button_unchecked');
                this.appendChild(swap);
                deleteIcon.style.display = 'none';
                this.parentElement.style.backgroundColor = 'white';
            }
        })

        var deleteIcon = document.createElement('i');
        deleteIcon.classList.add('material-icons');
        deleteIcon.classList.add('md-36');
        deleteIcon.classList.add('remove');
        var deleteIconTN = document.createTextNode('cancel');
        deleteIcon.style.display = 'none';
        deleteIcon.appendChild(deleteIconTN);
        deleteIcon.addEventListener('click', function () {
            this.parentElement.remove();
            if (current.children.length === 0) {
                current.style.display = 'none';
            }
        })

        li.appendChild(circleIcon);
        li.appendChild(deleteIcon);

        if (taskTime.value.length === 5 || taskDue.value.length > 4 || taskPrio.selectedIndex > 0 || taskDesc.value.length > 3) {
            var description = document.createElement('p');
            description.classList.add('details')
            if (taskPrio.selectedIndex > 0) {
                var spanPrio = document.createElement('span');
                var prioIcon = document.createElement('i');
                prioIcon.classList.add('material-icons');
                var prioIconTN = document.createTextNode('priority_high');
                prioIcon.appendChild(prioIconTN);
                var taskPrioTN = document.createTextNode('Priority: ')
                var taskPrioTNvalue = document.createTextNode(taskPrio.selectedOptions[0].innerHTML);
                spanPrio.appendChild(prioIcon);
                spanPrio.appendChild(taskPrioTN);
                spanPrio.appendChild(taskPrioTNvalue);
                description.appendChild(spanPrio);
            }
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
            if (taskDesc.value.length > 3) {
                var spanDesc = document.createElement('span');
                var descIcon = document.createElement('i');
                descIcon.classList.add('material-icons');
                var descIconTN = document.createTextNode('description');
                descIcon.appendChild(descIconTN);
                var taskDescTN = document.createTextNode(taskDesc.value);
                spanDesc.appendChild(descIcon);
                spanDesc.appendChild(taskDescTN);
                description.appendChild(spanDesc);
            }
            li.appendChild(description);
        }
        current.appendChild(li);
        current.style.display = 'block';
        taskName.value = '';
        taskTime.value = '';
        taskDue.value = '';
        taskPrio.selectedIndex = 0;
        taskDesc.value = '';
    }

    var tiles = document.querySelectorAll('.tile');
    var uls = document.querySelectorAll('ul')
    for (var i = 0; i < 7; i++) {
        uls[i].style.display = 'none';
    }
    var current = uls[0];
    var currentSelected = tiles[0];

    for (var i = 0; i < 7; i++) {
        (function (index) {
            tiles[index].addEventListener('click', function () {
                current.style.display = 'none';
                if (uls[index].children.length > 0) {
                    uls[index].style.display = 'block';
                }
                current = uls[index];

                currentSelected.classList.toggle('selected');
                tiles[index].classList.toggle('selected');
                currentSelected = tiles[index]
            });
        })(i)
    }

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

    document.querySelector('#add').addEventListener('click', function () {
        if (taskName.value.length > 3 && taskName.value.length < 100) {
            CreateNewTask();
        }
    })
    document.querySelector('.removeDone').addEventListener('click', function () {
        Array.from(current.children).forEach(element => {
            if (element.style.backgroundColor == 'rgb(243, 229, 245)') {
                element.remove();
            }
        });
        if (current.children.length === 0) {
            current.style.display = 'none';
        }
    })
    document.querySelector('.sort').addEventListener('click', function () {
        var list, i, b, switching, shouldSwitch, counter;
        switching = true;
        list = Array.from(current.children);
        counter = 0;
        
        while (switching) {
            switching = false;
            for (i = 0; i < list.length - counter; i++) {
                shouldSwitch = false; 
                if (list[i].children[2].firstElementChild.lastChild.textContent.length > 1) {
                    counter ++;
                    current.appendChild(list[i]);
                }
                b = Array.from(current.children);
                if (parseInt(b[i].children[2].firstElementChild.lastChild.textContent, 10) > parseInt(b[i + 1].children[2].firstElementChild.lastChild.textContent, 10)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
        }
    })
})
