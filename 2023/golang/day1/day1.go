package day1

import (
	"regexp"
	"strconv"
	"strings"
)

func Solve(input string, partTwo bool) int {
	lines := strings.Split(input, "\n")
	var numbers []int
	for _, line := range lines {
		var lineNumbers string
		for i := 0; i < len(line); i++ {
			number, ok := extractNumbers(line[i:], partTwo)
			if ok {
				lineNumbers += number
			}
		}
		if len(lineNumbers) > 0 {
			calibrationNumber, err := strconv.Atoi(lineNumbers[0:1] + lineNumbers[len(lineNumbers)-1:])
			if err != nil {
				continue
			}
			numbers = append(numbers, calibrationNumber)
		}
	}

	var sum int
	for _, num := range numbers {
		sum += num
	}

	return sum
}

func extractNumbers(line string, partTwo bool) (string, bool) {
	re := regexp.MustCompile(`^\d`)
	switch {
	case re.MatchString(line):
		return line[0:1], true
	case strings.HasPrefix(line, "one") && partTwo:
		return "1", true
	case strings.HasPrefix(line, "two") && partTwo:
		return "2", true
	case strings.HasPrefix(line, "three") && partTwo:
		return "3", true
	case strings.HasPrefix(line, "four") && partTwo:
		return "4", true
	case strings.HasPrefix(line, "five") && partTwo:
		return "5", true
	case strings.HasPrefix(line, "six") && partTwo:
		return "6", true
	case strings.HasPrefix(line, "seven") && partTwo:
		return "7", true
	case strings.HasPrefix(line, "eight") && partTwo:
		return "8", true
	case strings.HasPrefix(line, "nine") && partTwo:
		return "9", true
	default:
		return "0", false
	}
}
