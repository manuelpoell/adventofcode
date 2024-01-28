package day2

import "testing"

func TestDay2PartOne(t *testing.T) {
	const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
	const partTwo = false
	const expected = 8

	result := Solve(input, partTwo)

	if result != expected {
		t.Fatalf(`Day 2 Part 1: Expected result %d but received %d`, expected, result)
	}
}

func TestDay2PartTwo(t *testing.T) {
	const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
	const partTwo = true
	const expected = 2286

	result := Solve(input, partTwo)

	if result != expected {
		t.Fatalf(`Day 2 Part 2: Expected result %d but received %d`, expected, result)
	}
}
