var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var profilePictureInput = document.getElementById('profilePicture');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillElement = document.getElementById('skill');
    var usernameElement = document.getElementById('username');
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skill = skillElement.value;
        var username_1 = usernameElement.value;
        // --- Show Resume in HTML ---
        var profilePictureURL = ((_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0]) ? URL.createObjectURL(profilePictureInput.files[0]) : '';
        var resumeHTML = "\n            <h2>Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n            <p><strong>Name:</strong> ").concat(name_1, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n            <h3>Experience</h3>\n            <p>").concat(experience, "</p>\n            <h3>Skills</h3>\n            <p>").concat(skill, "</p>\n        ");
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
        }
        // --- Generate sharable link ---
        var sharableLink = "https://yourdomain.com/resumes/".concat(username_1.replace(/\s+/g, '_'), "_cv.html");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML += "<p>Sharable Link: <a href=\"".concat(sharableLink, "\" target=\"_blank\">").concat(sharableLink, "</a></p>");
        }
        // --- Generate PDF but don't download yet ---
        var jsPDF = window.jspdf.jsPDF;
        var pdf_1 = new jsPDF();
        pdf_1.text(20, 20, "Name: ".concat(name_1));
        pdf_1.text(20, 30, "Email: ".concat(email));
        pdf_1.text(20, 40, "Phone: ".concat(phone));
        pdf_1.text(20, 50, "Education: ".concat(education));
        pdf_1.text(20, 70, "Experience: ".concat(experience));
        pdf_1.text(20, 90, "Skills: ".concat(skill));
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                var imgData = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                pdf_1.addImage(imgData, 'JPEG', 150, 20, 40, 40);
                // Show the "Download PDF" button only after the image is loaded
                showDownloadButton(pdf_1, "".concat(username_1, "_resume.pdf"));
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        }
        else {
            showDownloadButton(pdf_1, "".concat(username_1, "_resume.pdf"));
        }
    }
    else {
        console.error('One or more input elements are missing');
    }
});
// Function to show the download button
function showDownloadButton(pdf, filename) {
    var resumeOutputElement = document.getElementById('resumeOutput');
    var downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download PDF';
    downloadButton.style.display = 'block';
    downloadButton.style.marginTop = '20px';
    downloadButton.style.padding = '10px';
    downloadButton.style.backgroundColor = 'blue';
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.cursor = 'pointer';
    downloadButton.addEventListener('click', function () {
        pdf.save(filename);
    });
    if (resumeOutputElement) {
        resumeOutputElement.appendChild(downloadButton);
    }
}
