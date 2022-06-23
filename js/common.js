const createRipple = (event) => {
    const button = event.target.closest('.btn');

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    // circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    // circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.style.left = `${event.offsetX - radius}px`;
    circle.style.top = `${event.offsetY - radius}px`;
    circle.classList.add("ripple");

    // const ripple = button.getElementsByClassName("ripple")[0];
    document.querySelectorAll(".ripple").forEach(ripple => ripple.remove());

    // if (ripple) {
    //     ripple.remove();
    // }

    button.appendChild(circle);
}



const btns = document.getElementsByClassName("btn");

for (const btn of btns) {
    btn.addEventListener('click', createRipple);
}