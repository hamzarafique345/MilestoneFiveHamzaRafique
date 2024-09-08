document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillElement = document.getElementById('skill') as HTMLTextAreaElement;
    const usernameElement = document.getElementById('username') as HTMLInputElement;

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && usernameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillElement.value;
        const username = usernameElement.value;

        // --- Show Resume in HTML ---
        const profilePictureURL = profilePictureInput.files?.[0] ? URL.createObjectURL(profilePictureInput.files[0]) : '';
        const resumeHTML = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skill}</p>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeHTML;
        }

        // --- Generate sharable link ---
        const sharableLink = `https://yourdomain.com/resumes/${username.replace(/\s+/g, '_')}_cv.html`;
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML += `<p>Sharable Link: <a href="${sharableLink}" target="_blank">${sharableLink}</a></p>`;
        }

        // --- Generate PDF but don't download yet ---
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.text(20, 20, `Name: ${name}`);
        pdf.text(20, 30, `Email: ${email}`);
        pdf.text(20, 40, `Phone: ${phone}`);
        pdf.text(20, 50, `Education: ${education}`);
        pdf.text(20, 70, `Experience: ${experience}`);
        pdf.text(20, 90, `Skills: ${skill}`);

        if (profilePictureInput.files && profilePictureInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgData = event.target?.result as string;
                pdf.addImage(imgData, 'JPEG', 150, 20, 40, 40);
                // Show the "Download PDF" button only after the image is loaded
                showDownloadButton(pdf, `${username}_resume.pdf`);
            };
            reader.readAsDataURL(profilePictureInput.files[0]);
        } else {
            showDownloadButton(pdf, `${username}_resume.pdf`);
        }
    } else {
        console.error('One or more input elements are missing');
    }
});

// Function to show the download button
function showDownloadButton(pdf: any, filename: string) {
    const resumeOutputElement = document.getElementById('resumeOutput');
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download PDF';
    downloadButton.style.display = 'block';
    downloadButton.style.marginTop = '20px';
    downloadButton.style.padding = '10px';
    downloadButton.style.backgroundColor = 'blue';
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.cursor = 'pointer';

    downloadButton.addEventListener('click', function() {
        pdf.save(filename);
    });

    if (resumeOutputElement) {
        resumeOutputElement.appendChild(downloadButton);
    }
}
