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
    addComment(comment, response.data.userName, response.data.commentId);
  }
};
const addComment = (comment, userName, commentId) => {
  const li = document.createElement("li");
  const UserNameField = document.createElement("a");
  const TextField = document.createElement("span");
  const DeleteBtn = document.createElement("a");
  const hiddenField = document.createElement("div");
  UserNameField.href = `/users/me`;
  UserNameField.innerText = `${userName}`;
  TextField.innerHTML = comment;
  DeleteBtn.innerText = "❌";
  hiddenField.innerHTML = commentId;
  hiddenField.style.display = "none";
  DeleteBtn.addEventListener("click", deleteComment);
  li.appendChild(UserNameField);
  li.appendChild(TextField);
  li.appendChild(DeleteBtn);
  li.appendChild(hiddenField);
  commentList.prepend(li);
  increaseNumber();
};
const deleteComment = async (event) => {
  const videoId = window.location.href.split("/videos/")[1];
  const commentId = event.target.parentNode.lastChild.innerHTML;
  const response = await axios({
    url: `/api/${videoId}/${commentId}/delete`,
    method: "POST",
  });
  if (response.status === 200) {
    deleteLi(event.target);
  }
};
const deleteLi = (target) => {
  const li = target.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);
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
