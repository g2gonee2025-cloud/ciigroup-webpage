(function () {
  if (document.body.dataset.page !== "authenticate") {
    return;
  }

  const authCode = document.getElementById("auth-code");
  const copyButton = document.getElementById("copy-code");
  const codeHelp = document.getElementById("code-help");

  if (!authCode || !copyButton || !codeHelp) {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  if (code) {
    authCode.textContent = code;
    codeHelp.textContent = "Code detected from the incoming URL.";
  } else {
    authCode.textContent = "No code supplied";
    copyButton.disabled = true;
    codeHelp.textContent = "Add ?code=YOUR-CODE to the URL to show an authentication code.";
  }

  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(authCode.textContent || "");
      copyButton.textContent = "Copied";
      window.setTimeout(function () {
        copyButton.textContent = "Copy";
      }, 1400);
    } catch (error) {
      codeHelp.textContent = "Clipboard access is unavailable in this browser.";
      console.error(error);
    }
  });
})();
