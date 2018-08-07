// Element 를 찾는 함수
const getElement = (how, what, number) => {
  // 들어온 인자값을 체크, string 이여야 한다
  if (typeof how !== 'string' || typeof what !== 'string') {
    // 문자가 아니면 undefind 반환
    return undefined;
  }

  // 3번째 인자값인 number가 있는지 체크
  if (number) {
    // number가 숫자여야 함
    if (typeof number === 'number') {
      // 리턴
      return docuemtn[how](what)[number];
    }

    // 숫자가 아니면 undefind 반환
    return undefined;
  }

  // 리턴
  return document[how](what);
};

// HTML 엘리먼트 생성 함수
const createElement = value => {
  if (typeof value !== 'string') {
    return undefined;
  }
  return document.createElement(value);
};

// HTML 엘리먼트에 설정을 추가하는 함수
const addConfingToElement = (element, type, value) => {
  element[type] = value;
  return element;
};

// HTML 엘리먼트 삭제 함수
const removeElement = value => {
  console.log(value.parentNode);
  value.parentNode.removeChild(value);
};

// Element, Element[]
const appendChild = (parent, child) => {
  for (let i = 0; i < child.length; i++) {
    parent.appendChild(child[i]);
  }

  return parent;
};

const createTask = value => {
  const list = addConfingToElement(createElement('li'), 'className', 'NEdit');

  const child = [];

  // 완료, 완료 취소 체크 박스
  child.push(addConfingToElement(addConfingToElement(createElement('input'), 'type', 'checkBox'), 'onclick', completeOrNot));
  // TODO value
  child.push(addConfingToElement(createElement('label'), 'innerText', value));
  // 변경 텍스트
  child.push(addConfingToElement(createElement('input'), 'type', 'text'));
  // 변경 버튼
  child.push(
    addConfingToElement(
      addConfingToElement(addConfingToElement(createElement('button'), 'innerText', 'Edit'), 'className', 'Edit'),
      'onclick',
      editMode
    )
  );
  // 삭제 버튼
  child.push(
    addConfingToElement(
      addConfingToElement(addConfingToElement(createElement('button'), 'innerText', 'Delete'), 'className', 'Delete'),
      'onclick',
      deleteMode
    )
  );

  return appendChild(list, child);
};

// 테스크 추가
const addTask = () => {
  console.log('추가요');
  // Input Element
  const newTaskValue = getElement('getElementById', 'new-task');

  // 글자가 아무것도 없을 때에는 아무 작업도 하지 않음
  if (newTaskValue.value.length === 0 || newTaskValue.value.trim() === '') {
    return;
  }

  // 새로운 작업 생성
  const task = createTask(newTaskValue.value);
  newTaskValue.value = '';

  console.log(task);

  // 추가
  appendChild(getElement('getElementById', 'incomplete-tasks'), [task]);
};

// 작업 완료 표시 함수
function completeOrNot() {
  console.log('변경이요');
  console.log(this.parentNode);

  const unit = this.parentNode;
  const incomplete = getElement('getElementById', 'incomplete-tasks');
  const complete = getElement('getElementById', 'completed-tasks');

  if (unit.parentNode === incomplete) {
    appendChild(complete, [unit]);
  } else {
    appendChild(incomplete, [unit]);
  }
}

// 변경 이벤트 함수
function editMode() {
  console.log('변경이요');
  console.log(this.parentNode);

  const unit = this.parentNode;

  const changeInput = unit.querySelector('input[type=text]');
  const mainContent = unit.querySelector('label');

  if (unit.classList.contains('NEdit')) {
    unit.classList.remove('NEdit');
    addConfingToElement(unit, 'className', 'Edit');

    changeInput.value = mainContent.innerText;
  } else {
    unit.classList.remove('Edit');
    addConfingToElement(unit, 'className', 'NEdit');

    mainContent.innerText = changeInput.value;
  }
}

// 삭제 이벤트 함수
function deleteMode() {
  console.log('삭제요');
  console.log(this.parentNode);

  const unit = this.parentNode;

  removeElement(unit);
}
