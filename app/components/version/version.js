'use strict';

angular.module('com.github.devzer01.Training.version', [
  'com.github.devzer01.Training.version.interpolate-filter',
  'com.github.devzer01.Training.version.version-directive'
])

.value('version', '0.1');
