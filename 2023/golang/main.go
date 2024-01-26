package main

import (
	"aoc2023/day1"
	"aoc2023/day2"
	"flag"
	"fmt"
	"os"
)

var day string
var fileName string
var partTwo bool

func init() {
	flag.StringVar(&day, "d", "1", "Number of day to solve")
	flag.StringVar(&fileName, "f", "./input.txt", "Path to input file")
	flag.BoolVar(&partTwo, "p", false, "Enable functions for part two")
	flag.Parse()
}

func main() {
	bytes, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	content := string(bytes)
	result := 0

	switch day {
	case "1":
		result = day1.Solve(content, partTwo)
	case "2":
		result = day2.Solve(content, partTwo)
	}

	if result != 0 {
		fmt.Println(result)
	} else {
		fmt.Println("Day " + day + " not found")
	}
}
