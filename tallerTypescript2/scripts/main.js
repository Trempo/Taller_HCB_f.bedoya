import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var studentName = document.getElementById('student-name');
var studentPhoto = document.getElementById('student-photo');
var studentInfo = document.getElementById('student');
var btnfilterMaxMin = document.getElementById('button-filterMaxMin');
var inputMinimo = document.getElementById("minimo");
var inputMaximo = document.getElementById("maximo");
var student = dataStudents[0];
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterMaxMin.onclick = function () { return applyFilterMaxMin(); };
renderCoursesInTable(dataCourses);
renderStudentInfo(student);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
studentName.innerHTML = student.nombre;
studentPhoto.setAttribute('src', student.foto);
function renderStudentInfo(student) {
    console.log('Desplegando informacion estudiante');
    var trElementCodigo = document.createElement("tr");
    trElementCodigo.innerHTML = "<tr>\n                            <td>Codigo</td><td>" + student.codigo + "</td>\n                          </tr>";
    var trElementCedula = document.createElement("tr");
    trElementCedula.innerHTML = "<td>Cedula</td><td>" + student.cedula + "</td>";
    var trElementEdad = document.createElement("tr");
    trElementEdad.innerHTML = "<td>Edad</td><td>" + student.edad + "</td>";
    var trElementDireccion = document.createElement("tr");
    trElementDireccion.innerHTML = "<td>Direccion</td><td>" + student.direccion + "</td>";
    var trElementTelefono = document.createElement("tr");
    trElementTelefono.innerHTML = "<td>Telefono</td><td>" + student.telefono + "</td>";
    studentInfo.appendChild(trElementCodigo);
    studentInfo.appendChild(trElementCedula);
    studentInfo.appendChild(trElementEdad);
    studentInfo.appendChild(trElementDireccion);
    studentInfo.appendChild(trElementTelefono);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterMaxMin() {
    var min = inputMinimo.valueAsNumber;
    min = (min == null) ? 0 : min;
    var max = inputMaximo.valueAsNumber;
    max = (max == null) ? 10 : max;
    console.log(max);
    clearCoursesInTable();
    var coursesFiltered = dataCourses.filter(function (dataCourse) { return dataCourse.credits >= min && dataCourse.credits <= max; });
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
