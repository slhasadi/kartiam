export function onInputChange(currentInput) {
  console.log("asdasdasdsd12121212");
  const allInputs = document.querySelectorAll(".two-factor");
  const currentIndex = Array.from(allInputs).indexOf(currentInput);
  console.log(allInputs);
  console.log(currentIndex);
  const nextInput = allInputs[currentIndex + 1];
  console.log(currentInput?.value?.length);
  if (currentInput?.value?.length === 1 && nextInput) {
    nextInput.focus();
    return;
  }

  const submitButton = document.getElementById("submit-button");
  if (submitButton) {
    submitButton.focus();
  }
}
