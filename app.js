// variables
const cart = document.getElementById('cart');
const courses = document.getElementById('listCourses');
const listCourses = document.querySelector('#listCart tbody');
const emptyCartBtn = document.getElementById('emptyCart');

// event listeners
loadEventListeners()

function loadEventListeners() {
    // when add to cart button is clicked
    courses.addEventListener('click', buyCourse);
    // when a single course is removed from the cart
    cart.addEventListener('click', deleteCourse);
    // when empty cart is clicked
    emptyCartBtn.addEventListener('click', emptyCart);
    // after reloading show data from local storage
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

function buyCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('addCart')) {
        const course = e.target.parentElement.parentElement;
        readData(course);
    }
}

function readData(course) {
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('p').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    insertCart(courseInfo);
}

function insertCart(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src='${data.image}'></td>
        <td>${data.title}</td>
        <td>${data.price}</td>
        <td class="cross"><a class='deleteCourseBtn' data-id = '${data.id}'>X</a></td>
    `;
    listCourses.appendChild(row);
    saveCourseLS(data);
}

function deleteCourse(e) {
    e.preventDefault();
    let course, course_id;
    if (e.target.classList.contains('deleteCourseBtn')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        course_id = course.querySelector('a').getAttribute('data-id');
    }
    deleteCourseLS(course_id);
}

function emptyCart() {
    while (listCourses.firstChild) {
        listCourses.removeChild(listCourses.firstChild);
    }
    emptyLS();
    return false;
}

function getCoursesLS() {
    let coursesLs
    if (localStorage.getItem('courses') === null) {
        coursesLs = [];
    } else {
        coursesLs = JSON.parse(localStorage.getItem('coursesLs'));
    }
    return coursesLs;
}

function saveCourseLS(information) {
    let data;
    data = getCoursesLS();
    data.push(information);
    localStorage.setItem('courses', JSON.stringify(data));
}

function readLocalStorage() {
    let coursesLS;
    coursesLS = getCoursesLS();
    coursesLS.forEach(function(data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src='${data.image}'></td>
            <td>${data.title}</td>
            <td>${data.price}</td>
            <td class="cross"><a class='deleteCourseBtn' data-id = '${data.id}'>X</a></td>
        `;
        listCourses.appendChild(row);
    })
}

function emptyLS() {
    localStorage.clear();
}

function deleteCourseLS(course_id) {
    let coursesLS;
    coursesLS = getCoursesLS();
    coursesLS.forEach(function(courseLS, index) {
        if (courseLS.id === course_id) {
            coursesLS.splice(index, 1);
        }
    })
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}