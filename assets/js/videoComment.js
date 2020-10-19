import axios from "axios";
const addCommentForm = document.querySelector("#jsAddComment");
const commentList = document.querySelector("#jsCommentList");
const commentNumber = document.querySelector("#jsCommentNumber");

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};
const addComment = (comment) => {
  const li = document.createElement("li");
  const UserNameField = document.createElement("a");
  const TextField = document.createElement("span");
  UserNameField.href = `/users/me`;
  UserNameField.innerText = "me";
  TextField.innerHTML = comment;
  li.appendChild(UserNameField);
  li.appendChild(TextField);
  commentList.prepend(li);
  increaseNumber();
};
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
