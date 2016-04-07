/**
 * This script contains the 
 * This is the script injected into manager.html
 * via a dynamic <script> tag. It serves as
 * the main logic for the timemark manager and organizer.
 * It does not have access to any of the
 * chrome.* APIs.
 *
 * @author YouTime
 * @version 1.0
 * @since 2016-04-06
 */
 
$(".share").on("click", function(e) {
    e.preventDefault();
    $(this).parent().remove();
});