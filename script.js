// Get HTML elements
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


// Update date and time when the visitor selects a purpose
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


// Submit visitor registration
visitorForm.addEventListener("submit", function (event) {

    event.preventDefault();

    updateDateTime();

    // Get visitor details
    const visitor = {
        date: visitDate.value,
        time: visitTime.value,

        name: document.getElementById("visitorName").value.trim(),
        contact: document.getElementById("contact").value.trim(),

        designation: document.getElementById("designation").value.trim(),
        organization: document.getElementById("organization").value.trim(),

        purpose: purpose.value === "Other"
            ? otherPurpose.value.trim()
            : purpose.value,

        place: document.getElementById("place").value.trim(),

        reference: document.getElementById("reference").value.trim()
    };


    // Read previously saved visitor records
    let visitors = [];

    try {
        visitors = JSON.parse(
            localStorage.getItem("principalVisitors") || "[]"
        );

        if (!Array.isArray(visitors)) {
            visitors = [];
        }

        // Add new visitor
        visitors.push(visitor);

        // Save visitor records
        localStorage.setItem(
            "principalVisitors",
            JSON.stringify(visitors)
        );

    } catch (error) {
        alert("Unable to save the registration on this device. Please try again.");
        return;
    }


    // Show success message
    formCard.classList.add("hidden");
    successCard.classList.remove("hidden");

    // Move page to success message
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