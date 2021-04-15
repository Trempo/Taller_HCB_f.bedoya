
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const studentName: HTMLElement = document.getElementById('student-name')!;
const studentPhoto: HTMLElement = document.getElementById('student-photo')!;
let studentInfo: HTMLElement = document.getElementById('student')!;
const btnfilterMaxMin: HTMLElement = document.getElementById('button-filterMaxMin')!;
const inputMinimo: HTMLInputElement = <HTMLInputElement> document.getElementById("minimo")!;
const inputMaximo: HTMLInputElement = <HTMLInputElement> document.getElementById("maximo")!;
const student: Student = dataStudents[0];

btnfilterByName.onclick = () => applyFilterByName();
btnfilterMaxMin.onclick = () => applyFilterMaxMin();
renderCoursesInTable(dataCourses);
renderStudentInfo(student);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`
studentName.innerHTML = student.nombre;
studentPhoto.setAttribute('src',student.foto);



function renderStudentInfo(student: Student): void{
  console.log('Desplegando informacion estudiante');
  let trElementCodigo = document.createElement("tr");
  trElementCodigo.innerHTML = `<tr>
                            <td>Codigo</td><td>${student.codigo}</td>
                          </tr>`;
  let trElementCedula = document.createElement("tr");
  trElementCedula.innerHTML = `<td>Cedula</td><td>${student.cedula}</td>`;                      
  
  let trElementEdad = document.createElement("tr");
  trElementEdad.innerHTML = `<td>Edad</td><td>${student.edad}</td>`;

  let trElementDireccion = document.createElement("tr");
  trElementDireccion.innerHTML = `<td>Direccion</td><td>${student.direccion}</td>`;

  let trElementTelefono = document.createElement("tr");
  trElementTelefono.innerHTML = `<td>Telefono</td><td>${student.telefono}</td>`;

  studentInfo.appendChild(trElementCodigo);
  studentInfo.appendChild(trElementCedula);
  studentInfo.appendChild(trElementEdad);
  studentInfo.appendChild(trElementDireccion);
  studentInfo.appendChild(trElementTelefono);
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 

function applyFilterMaxMin(){
  let min = inputMinimo.valueAsNumber;
  min = (min==null)? 0:min;
  let max = inputMaximo.valueAsNumber;
  max = (max==null)? 10:max;
  console.log(max);
  clearCoursesInTable();
  let coursesFiltered: Course[] = dataCourses.filter(dataCourse => dataCourse.credits>=min && dataCourse.credits<=max);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}