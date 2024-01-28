package day1

import "testing"

func TestDay1PartOne(t *testing.T) {
	const input = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet"
	const partTwo = false
	const expected = 142

	result := Solve(input, partTwo)

	if result != expected {
		t.Fatalf(`Day 1 Part 1: Expected result %d but received %d`, expected, result)
	}
}

func TestDay1PartTwo(t *testing.T) {
	const input = "two1nine\neightwothree\nabcone2threexyz\nxtwone53four\n4nineeightseven2\nzoneight234\n7pqrstsixteen"
	const partTwo = true
	const expected = 281

	result := Solve(input, partTwo)

	if result != expected {
		t.Fatalf(`Day 1 Part 2: Expected result %d but received %d`, expected, result)
	}
}
