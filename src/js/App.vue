<template>
	<div id="app">
		<h1>Labyrinth Generator</h1>
		<p>Generate a random maze for <a href="https://www.dreimagier.de/das-magische-labyrinth-band/">The Magic Labyrinth</a>.</p>
		<div>
			<label for="wallInput">Number of walls (typically 19-24)</label>
			<input type="number" id="wallInput" v-model="wallCount" />
		</div>
		<button-regenerate v-on:regenerate="regenerate"></button-regenerate>

		<div id="maze">
			<div class="mazerow">
				<wall-vertical v-bind:is-active="checkVertical(0, 0)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(0, 1)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(0, 2)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(0, 3)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(0, 4)"></wall-vertical>
			</div>
			<div class="mazerow">
				<wall-horizontal v-bind:is-active="checkHorizontal(0, 0)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(0, 1)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(0, 2)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(0, 3)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(0, 4)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(0, 5)"></wall-horizontal>
			</div>
			<div class="mazerow">
				<wall-vertical v-bind:is-active="checkVertical(1, 0)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(1, 1)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(1, 2)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(1, 3)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(1, 4)"></wall-vertical>
			</div>
			<div class="mazerow">
				<wall-horizontal v-bind:is-active="checkHorizontal(1, 0)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(1, 1)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(1, 2)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(1, 3)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(1, 4)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(1, 5)"></wall-horizontal>
			</div>
			<div class="mazerow">
				<wall-vertical v-bind:is-active="checkVertical(2, 0)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(2, 1)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(2, 2)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(2, 3)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(2, 4)"></wall-vertical>
			</div>
			<div class="mazerow">
				<wall-horizontal v-bind:is-active="checkHorizontal(2, 0)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(2, 1)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(2, 2)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(2, 3)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(2, 4)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(2, 5)"></wall-horizontal>
			</div>
			<div class="mazerow">
				<wall-vertical v-bind:is-active="checkVertical(3, 0)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(3, 1)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(3, 2)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(3, 3)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(3, 4)"></wall-vertical>
			</div>
			<div class="mazerow">
				<wall-horizontal v-bind:is-active="checkHorizontal(3, 0)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(3, 1)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(3, 2)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(3, 3)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(3, 4)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(3, 5)"></wall-horizontal>
			</div>
			<div class="mazerow">
				<wall-vertical v-bind:is-active="checkVertical(4, 0)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(4, 1)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(4, 2)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(4, 3)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(4, 4)"></wall-vertical>
			</div>
			<div class="mazerow">
				<wall-horizontal v-bind:is-active="checkHorizontal(4, 0)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(4, 1)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(4, 2)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(4, 3)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(4, 4)"></wall-horizontal>
				<wall-horizontal v-bind:is-active="checkHorizontal(4, 5)"></wall-horizontal>
			</div>
			<div class="mazerow">
				<wall-vertical v-bind:is-active="checkVertical(5, 0)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(5, 1)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(5, 2)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(5, 3)"></wall-vertical>
				<wall-vertical v-bind:is-active="checkVertical(5, 4)"></wall-vertical>
			</div>
		</div>
		<p>Source available on <a href="https://github.com/dconstructing/labyrinth-generator">GitHub</a>.</p>
		<p>This site is in no way affiliated with <a href="https://www.dreimagier.de/das-magische-labyrinth-band/">The Magic Labyrinth</a> or <a href="https://www.dreimagier.de/">Drei Magier</a>, the game's publisher.</p>
	</div>
</template>

<script>
import * as generator from './generator.js';
import ButtonRegenerate from './button-regenerate.vue';
import WallHorizontal from './wall-horizontal.vue';
import WallVertical from './wall-vertical.vue';

export default {
	data: function() {
		return {
			maze: {},
			wallCount: 19
		}
	},
	methods: {
		regenerate: function(event) {
			this.generateMaze();
		},
		generateMaze: function() {
			console.log('generating');
			const output = generator.maze(6, 6, this.wallCount);
			console.log(output);
			this.maze = output;
		},
		checkVertical: function(set, position) {
			// for a vertical wall, check whether horizontal movement is allowed
			if (this.maze.horiz[set]) {
				return !this.maze.horiz[set][position];
			}
			return true;
		},
		checkHorizontal: function(set, position) {
			// for a horizontal wall, check whether vertical movement is allowed
			if (this.maze.verti[set]) {
				return !this.maze.verti[set][position];
			}
			return true;
		}
	},
	components: {
		ButtonRegenerate,
		WallHorizontal,
		WallVertical
	},
	created: function() {
		console.log('app created');
		this.generateMaze();
	}
}
</script>
