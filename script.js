// =============================================
// DevOps Deployment Center
// Frontend Deployment Simulation
// =============================================


const deploymentStart = Date.now();


const deploymentEvents = [

    {
        stage: "SOURCE",
        message: "Source code retrieved from GitHub"
    },

    {
        stage: "BUILD",
        message: "Jenkins build and validation completed"
    },

    {
        stage: "DEPLOY",
        message: "Ansible deployment completed"
    },

    {
        stage: "SERVER",
        message: "Tomcat application server is online"
    },

    {
        stage: "LIVE",
        message: "Application is now serving traffic"
    }

];


// =============================================
// Live Clock
// =============================================

function updateClock() {

    const now = new Date();

    const date =
        now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    const time =
        now.toLocaleTimeString("en-IN");

    document.getElementById("clock").textContent =
        `Runtime: ${date} • ${time}`;
}


updateClock();

setInterval(updateClock, 1000);



// =============================================
// Deployment Runtime
// =============================================

function updateDeploymentRuntime() {

    const elapsed =
        Math.floor(
            (Date.now() - deploymentStart) / 1000
        );

    const minutes =
        Math.floor(elapsed / 60);

    const seconds =
        elapsed % 60;

    const runtime =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.getElementById(
        "deployment-runtime"
    ).textContent = runtime;
}


setInterval(
    updateDeploymentRuntime,
    1000
);



// =============================================
// Deployment Activity
// =============================================

function showDeploymentEvents() {

    const container =
        document.getElementById(
            "deployment-events"
        );


    deploymentEvents.forEach(
        (event, index) => {

            setTimeout(
                () => {

                    const row =
                        document.createElement("div");

                    row.className =
                        "deployment-event";


                    row.innerHTML = `

                        <div
                            class="event-indicator">
                        </div>


                        <div
                            class="event-content">

                            <strong>
                                ${event.stage}
                            </strong>

                            <span>
                                ${event.message}
                            </span>

                        </div>


                        <div
                            class="event-time">

                            DONE

                        </div>

                    `;


                    container.prepend(row);

                },

                (index + 1) * 900
            );

        }
    );
}



// =============================================
// Application Health
// =============================================

function updateHealthStatus() {

    setTimeout(
        () => {

            const health =
                document.getElementById(
                    "application-health"
                );

            health.textContent =
                "● HEALTHY";

            health.style.color =
                "#35e89a";

        },

        2800
    );
}



// =============================================
// Start Dashboard
// =============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDeploymentRuntime();

        showDeploymentEvents();

        updateHealthStatus();

    }
);
