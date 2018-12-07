var ADVANCE_INTERVAL = 5000;

var homeTimeMachineObserver = {
  notify: function(timeMachines) {
    timeMachines.forEach(function(timeMachine, index) {
      timeMachine.autoAdvance(ADVANCE_INTERVAL);
    });
  }
};

TimeMachineManager.addObserver(homeTimeMachineObserver);
