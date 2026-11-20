const visitorForm = document.getElementById("visitorForm");
const purpose = document.getElementById("purpose");
const otherPurposeBox = document.getElementById("otherPurposeBox");
const otherPurpose = document.getElementById("otherPurpose");
const confidentialNote = document.getElementById("confidentialNote");

const formCard = document.getElementById("formCard");
const successCard = document.getElementById("successCard");
const newVisitorBtn = document.getElementById("newVisitorBtn");

const visitDate = document.getElementById("visitDate");
const visitTime = document.getElementById("visitTime");

// Automatically fill date and time
function updateDateTime() {
    const now = new Date();

    visitDate.value = now.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    visitTime.value = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

updateDateTime();

// Purpose selection
purpose.addEventListener("change", function () {
    otherPurposeBox.classList.add("hidden");
    confidentialNote.classList.add("hidden");
    otherPurpose.required = false;

    if (purpose.value === "Other") {
        otherPurposeBox.classList.remove("hidden");
        otherPurpose.required = true;
    } 
    else if (purpose.value === "Confidential") {
        confidentialNote.classList.remove("hidden");
    }
});

// Submit registration
visitorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    updateDateTime();

    const contactNumber = document
        .getElementById("contact")
        .value.trim();

    const currentDate = visitDate.value;

    let visitors = [];

    try {
        visitors = JSON.parse(
            localStorage.getItem("principalVisitors") || "[]"
        );

        if (!Array.isArray(visitors)) {
            visitors = [];
        }
    } 
    catch (error) {
        alert("Unable to read saved registrations. Please try again.");
        return;
    }

    // Check for duplicate registration
    const alreadyRegistered = visitors.some(function (visitor) {
        return visitor.contact === contactNumber &&
               visitor.date === currentDate;
    });

    if (alreadyRegistered) {
        alert(
            "You have already registered today using this contact number. Duplicate registration is not allowed."
        );
        return;
    }

    // Create visitor record
    const visitor = {
        date: visitDate.value,
        time: visitTime.value,
        name: document.getElementById("visitorName").value.trim(),
        contact: contactNumber,
        designation: document.getElementById("designation").value.trim(),
        organization: document.getElementById("organization").value.trim(),
        purpose: purpose.value === "Other"
            ? otherPurpose.value.trim()
            : purpose.value,
        place: document.getElementById("place").value.trim(),
        reference: document.getElementById("reference").value.trim()
    };

    visitors.push(visitor);

    try {
        localStorage.setItem(
            "principalVisitors",
            JSON.stringify(visitors)
        );
    } 
    catch (error) {
        alert("Unable to save registration. Please try again.");
        return;
    }

    formCard.classList.add("hidden");
    successCard.classList.remove("hidden");

    successCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Register another visitor
newVisitorBtn.addEventListener("click", function () {
    visitorForm.reset();

    otherPurposeBox.classList.add("hidden");
    confidentialNote.classList.add("hidden");
    otherPurpose.required = false;

    updateDateTime();

    successCard.classList.add("hidden");
    formCard.classList.remove("hidden");

    formCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
