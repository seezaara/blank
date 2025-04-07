const Blank = (function () {
    const ids = [];
    const handlers = {};
    const urls = {};  
    let pendingReplace = false;     // Internal marker to track programmatic backs
    let isHandlingPop = false;

    // Push a trap/root state to prevent accidental exits
    function initTrapState() {
        if (!history.state || typeof history.state.id !== "number") {
            history.replaceState({ id: 0 }, "", location.pathname);
        }
    }

    function getNextId() {
        return (history.state?.id || 0) + 1;
    }

    function getLastId() {
        return ids[ids.length - 1];
    }

    function add(onBackCallback) {
        initTrapState();
        const nextId = getNextId();
        ids.push(nextId);
        handlers[nextId] = onBackCallback;
        urls[nextId] = location.pathname;

        setTimeout(() => {
            console.log(ids, { id: nextId });
            history.pushState({ id: nextId }, "", location.pathname);
        }, 0);
        return nextId;
    }

    function remove(id = -1) {
        const targetId = id === -1 ? getLastId() : id;

        if (targetId in handlers && ids.length > 0) {
            delete handlers[targetId];
            delete urls[targetId];
            ids.pop();
        }
    }

    function back() {
        // When we programmatically go back, mark that we want to overwrite the next page
        pendingReplace = true;
        history.back();
    }

    window.addEventListener("popstate", function () {
        if (isHandlingPop) return;
        isHandlingPop = true; 
        const stateid = (history.state.id || 0) + 1; 
        if (stateid > 0 && ids.includes(stateid)) { 
            const handler = handlers[stateid];
            // Remove from our own stack
            ids.pop();
            delete handlers[stateid];
            delete urls[stateid];

            // Overwrite this state with the trap/root if coming from .back()
            if (pendingReplace) {
                history.replaceState({ id: 0 }, "", location.pathname);
                pendingReplace = false;
            }

            if (typeof handler === "function") {
                handler(false);
            }
        }  
        setTimeout(() => {
            isHandlingPop = false;
        }, 0);
    });

    return {
        add,
        remove,
        back,
    };
})();
