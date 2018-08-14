// HTML Element를 찾는 함수
const getElement = (how, what, number) => {
  if (number) {
    return docuemtn[how](what)[number]
  }

  return document[how](what)
}
// HTML Element 안에서 Element를 찾는 함수
const getElementInElement = (where, what) => {
  return where.querySelector(what)
}

// HTML Element의 ClassList 다루는 함수
const classControlElement = (element, how, what) => {
  return element.classList[how](what)
}

// 항상 쓰이는 값 추가
const newTaskValue = getElement('getElementById', 'new-task')
const incompleteTask = getElement('getElementById', 'incomplete-tasks')
const completeTask = getElement('getElementById', 'completed-tasks')

// HTML Element 생성 함수
const createElement = value => {
  return document.createElement(value)
}

// HTML Element에 설정을 추가하는 함수
// element: HTMLElement, configArray: {type: string, value: string}[]
const addConfingToElement = (element, configArray) => {
  for (let i = 0; i < configArray.length; i++) {
    element[configArray[i].type] = configArray[i].value
  }
  return element
}

// HTML Element 삭제 함수
const removeElement = value => {
  return value.parentNode.removeChild(value)
}

// HTML Element에 Child Element 를 추가하는 함수
// Element, Element[]
const appendChild = (parent, child) => {
  for (let i = 0; i < child.length; i++) {
    parent.appendChild(child[i])
  }

  return parent
}

// 새로운 To-Do 테스크를 만드는 함수
const createTask = value => {
  // 최종 리스트 정의: 여기에 child Element가 들어감
  const list = addConfingToElement(createElement('li'), [{ type: 'className', value: 'NEdit' }])

  const child = []

  // 완료, 완료 취소 체크 박스
  child.push(
    addConfingToElement(createElement('input'), [
      { type: 'type', value: 'checkBox' },
      { type: 'onclick', value: completeOrNot }
    ])
  )
  // TODO value
  child.push(addConfingToElement(createElement('label'), [{ type: 'innerText', value }]))
  // TODO value 변경할 때 쓰이는 Input
  child.push(addConfingToElement(createElement('input'), [{ type: 'type', value: 'text' }]))
  // 변경 버튼
  child.push(
    addConfingToElement(createElement('button'), [
      { type: 'innerText', value: 'Edit' },
      { type: 'className', value: 'Edit' },
      { type: 'onclick', value: editMode }
    ])
  )
  // 삭제 버튼
  child.push(
    addConfingToElement(createElement('button'), [
      { type: 'innerText', value: 'Delete' },
      { type: 'className', value: 'Delete' },
      { type: 'onclick', value: deleteMode }
    ])
  )

  return appendChild(list, child)
}
// 테스크 추가
function addTask() {
  console.log('투두 추가')
  // 글자가 아무것도 없을 때에는 아무 작업도 하지 않음
  if (newTaskValue.value.length === 0 || newTaskValue.value.trim() === '') {
    return
  }
  // 새로운 작업 생성
  const task = createTask(newTaskValue.value)
  newTaskValue.value = ''

  // 추가
  return appendChild(incompleteTask, [task])
}

// ParentElement에 따라서 위치가 바뀌는 함수
const changeByParentElement = unit => {
  if (unit.parentNode === incompleteTask) {
    appendChild(completeTask, [unit])
  } else {
    appendChild(incompleteTask, [unit])
  }
}
// 작업 완료 표시 함수
function completeOrNot() {
  console.log('투두 완료')

  const unit = this.parentNode

  return changeByParentElement(unit)
}

// 엘리먼트의 ClassName을 확인해서, 변경 모드와 변경 모드 아님으로 바뀌는 함수
const changeByClassName = (unit, changeInput, mainContent) => {
  if (classControlElement(unit, 'contains', 'NEdit')) {
    classControlElement(unit, 'remove', 'NEdit')
    addConfingToElement(unit, [{ type: 'className', value: 'Edit' }])
    changeInput.value = mainContent.innerText
  } else {
    classControlElement(unit, 'remove', 'Edit')
    addConfingToElement(unit, [{ type: 'className', value: 'NEdit' }])
    mainContent.innerText = changeInput.value
  }
}
// 변경 이벤트 함수
function editMode() {
  console.log('투두 변경')
  const unit = this.parentNode

  const changeInput = getElementInElement(unit, 'input[type=text]')
  const mainContent = getElementInElement(unit, 'label')

  return changeByClassName(unit, changeInput, mainContent)
}

// 삭제 이벤트 함수
function deleteMode() {
  console.log('투두 삭제')
  const unit = this.parentNode
  return removeElement(unit)
}
