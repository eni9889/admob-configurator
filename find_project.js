jQuery(function () {
    var modal, targetNode = document.querySelector("[on-menu-open='psCtrl.handleMenuOpen()']"), NAME_PROJECT = "Appodeal";

    function createProject() {
        // create Appodeal project
        logConsole("show new project window");
        // show new project window
        modal.show("Appodeal Chrome Extension", "Create Appodeal project. Please wait");
        run_script("jQuery('[ng-click=\"psCtrl.showCreateProjectPage()\"]').click();");
        // set project name (Appodeal)
        logConsole("Set project name (Appodeal)");
        waitForElement("#p6ntest-project-create-modal", null, function (element) {
            run_script("jQuery('[ng-model=\"project.name\"]').val('Appodeal');angular.element(jQuery('[ng-model=\"project.name\"]')).triggerHandler('input');");
            // create project after name is set up
            logConsole("Create project after name is set up");
            setTimeout(function () {
                // I agree that my use of any services and related APIs is subject to my compliance with the applicable Terms of Service.
                var needAcceptTerms = $("#tos-agree");
                if (needAcceptTerms.length) {
                    var message = "You must agree to the Admob <b>Terms of Service</b> and click <b>Create</b> to continue.";
                    modal.show("Appodeal Chrome Extension", message);
                    logConsole(message);
                } else {
                    // submit new project form
                    run_script("angular.element(jQuery('#p6n-project-creation-dialog-ok-button')).controller().submit();");
                    logConsole("Go to the newly created project");
                }
                // go to the newly created project
                waitForElement("a:contains('Appodeal')", null, function (element) {
                    var projectName = locationProjectName();
                    if(projectName){
                        var projectUrl = overviewPageUrl(projectName);
                        logConsole("New project is found. Redirect to the new project", projectUrl);
                        document.location.href = projectUrl;
                    }
                })
            }, 2000);
        })
    }

    setTimeout(function () {
        appendJQuery(function () {
            logConsole('Find Appodeal project. Please wait');
            modal = new Modal();
            modal.show("Appodeal Chrome Extension", "Find Appodeal project. Please wait 30 seconds");
            var row = '[ng-class=\"{\'p6n-tablerow-selected\': projectListCtrl.selectionState[project.id]}\"]';
            // it finds selector 30 seconds then create Projects
            waitForElement(row, 60 , function (element) {
                if (element.length > 0) {
                    if (element.length >= 2) {
                        modal.show("Appodeal Chrome Extension", 'You have more then one project named "Appodeal". Please remove all projects named "Appodeal" except one and retry second step ');
                    } else {
                        waitForElement("[ng-if=\"projectListCtrl.showAttributeColumnsMap.id\"]", null, function (element) {
                            var projectId = element[1].innerText;
                            logConsole('Project found. Redirect to ' + overviewPageUrl(projectId));
                            document.location.href = overviewPageUrl(projectId);
                        })
                    }
                } else {
                    logConsole('Create Appodeal project. triggerMouseEvent() and createProject()');
                    triggerMouseEvent(targetNode, "mousedown");
                    createProject();
                }
            });
        });
    }, 2000);
});