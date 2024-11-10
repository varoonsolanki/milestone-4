document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Type assertion
    const firstnameElement = document.getElementById('firstname') as HTMLInputElement;
    const lastnameElement = document.getElementById('lastname') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const cityElement = document.getElementById('city') as HTMLInputElement;
    const countryElement = document.getElementById('country') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    if (profilePictureInput && countryElement && cityElement && firstnameElement && lastnameElement && addressElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
        const firstname = firstnameElement.value;
        const lastname = lastnameElement.value;
        const address = addressElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const city = cityElement.value;
        const country = countryElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

         // Handle profile picture
    const profilePictureFile = profilePictureInput.files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        // Create Resume Output with the corrected template literals
        const resumeOutput = `
            <h2>Resume</h2>
             ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">` : ''}
            <p><strong>First Name:</strong> <span id="edit-firstname" class="editable">${firstname}</span></p>
            <p><strong>last Name:</strong> <span id="edit-lastname" class="editable">${lastname}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
            <p><strong>Address:</strong> <span id="edit-address" class="editable">${address}</span></p>
            <p><strong>City:</strong> <span id="edit-city" class="editable">${city}</span></p>
            <p><strong>Country:</strong> <span id="edit-country" class="editable">${country}</span></p>
            
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            
            <h3>Work Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        // Display the resume output
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        }
    } else {
        console.error('One or more elements are missing');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
