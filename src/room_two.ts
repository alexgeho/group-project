export async function loadRoomTwo(onComplete: () => void): Promise<void> {
  const container = document.getElementById("database");
  if (!container) return;

  // Initialize only if puzzle not yet solved
  if (!localStorage.getItem("key1")) {
    initBrokenDatabase();
  }

  container.innerHTML = `
    <h2>Database Recovery</h2>
    <p>Restore the secret key: <strong>M A R S</strong></p>

    <div id="storage-view"></div>

    <hr>

    <h3>Add / Update</h3>
    <input id="add-key" placeholder="Key" />
    <input id="add-value" placeholder="Value" />
    <button id="add-btn">Save</button>

    <h3>Remove</h3>
    <input id="remove-key" placeholder="Key" />
    <button id="remove-btn">Delete</button>

    <hr>

    <button id="check-btn">Check Database</button>
    <button id="reset-btn">Reset Room</button>
    <button id="back-to-lobby-btn">Back To Lobby</button>

    <button id="next-btn">
      Next
    </button>
  `;

  renderStorage();

  const addBtn = document.getElementById("add-btn");
  const removeBtn = document.getElementById("remove-btn");
  const checkBtn = document.getElementById("check-btn");
  const resetBtn = document.getElementById("reset-btn");
  const toLobbyBtn = document.getElementById("back-to-lobby-btn");
  const nextBtn = document.getElementById("next-btn");

  toLobbyBtn?.addEventListener("click", onComplete);

  if (addBtn) addBtn.addEventListener("click", addOrUpdateItem);
  if (removeBtn) removeBtn.addEventListener("click", removeItem);

  if (checkBtn) {
    checkBtn.addEventListener("click", function () {
      const success = checkDatabase();
      if (success && nextBtn) {
        nextBtn.classList.add("show");
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      initBrokenDatabase();
      renderStorage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      onComplete();
    });
  }
}

function initBrokenDatabase(): void {
  localStorage.removeItem("key1");
  localStorage.removeItem("key2");
  localStorage.removeItem("key3");
  localStorage.removeItem("key4");
  localStorage.removeItem("temp");
  localStorage.removeItem("debug");

  localStorage.setItem("key1", "M");
  localStorage.setItem("key3", "R");
  localStorage.setItem("temp", "123");
  localStorage.setItem("debug", "true");
}

function renderStorage(): void {
  const container = document.getElementById("storage-view");
  if (!container) return;

  container.innerHTML = "";

  const puzzleKeys = ["key1", "key2", "key3", "key4", "temp", "debug"];

  for (let i = 0; i < puzzleKeys.length; i++) {
    const value = localStorage.getItem(puzzleKeys[i]);
    if (value !== null) {
      const row = document.createElement("div");
      row.textContent = puzzleKeys[i] + ": " + value;
      container.appendChild(row);
    }
  }
}

function addOrUpdateItem(): void {
  const keyInput = document.getElementById("add-key") as HTMLInputElement;
  const valueInput = document.getElementById("add-value") as HTMLInputElement;

  if (!keyInput.value || !valueInput.value) return;

  localStorage.setItem(keyInput.value, valueInput.value);

  keyInput.value = "";
  valueInput.value = "";

  renderStorage();
}

function removeItem(): void {
  const keyInput = document.getElementById("remove-key") as HTMLInputElement;
  if (!keyInput.value) return;

  localStorage.removeItem(keyInput.value);

  keyInput.value = "";

  renderStorage();
}

function checkDatabase(): boolean {
  const k1 = localStorage.getItem("key1");
  const k2 = localStorage.getItem("key2");
  const k3 = localStorage.getItem("key3");
  const k4 = localStorage.getItem("key4");

  if (!k1 || !k2 || !k3 || !k4) {
    alert("Database still corrupted.");
    return false;
  }

  if (
    localStorage.getItem("temp") !== null ||
    localStorage.getItem("debug") !== null
  ) {
    alert("Remove corrupted entries.");
    return false;
  }

  if (k1 === "M" && k2 === "A" && k3 === "R" && k4 === "S") {
    localStorage.setItem("artifact_i", "true");

    alert("ACCESS GRANTED\nArtifact 'I' collected!");

    return true;
  }

  alert("Incorrect configuration.");
  return false;
}
