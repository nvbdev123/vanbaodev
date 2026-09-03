const verifyBtn =
    document.getElementById(
        "verifyBtn"
    );


const checkBox =
    document.getElementById(
        "checkBox"
    );


const verifyStatus =
    document.getElementById(
        "verifyStatus"
    );


verifyBtn.addEventListener(
    "click",

    () => {

        if (
            checkBox.classList.contains(
                "checked"
            )
        ) {

            return;

        }


        checkBox.classList.add(
            "checked"
        );


        verifyStatus.textContent =
            "Đang kiểm tra bảo mật...";


        setTimeout(

            () => {

                verifyStatus.textContent =
                    "✓ Xác minh thành công";


                verifyBtn.style.borderColor =
                    "#3dd9b4";

            },

            700

        );

    }

);


/* Tạo Ray ID ngẫu nhiên */

const bytes =
    crypto.getRandomValues(
        new Uint8Array(6)
    );


const rayId =
    [...bytes]
        .map(

            number =>
                number
                    .toString(16)
                    .padStart(
                        2,
                        "0"
                    )

        )
        .join(
            ""
        );


document.getElementById(
    "rayId"
).textContent =
    rayId;
