package main

import (
	"flag"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var fileName string
var extra bool

func init() {
	flag.StringVar(&fileName, "f", "./input.txt", "Name of input file")
	flag.BoolVar(&extra, "e", false, "Enable functions for part two")
	flag.Parse()
}

func main() {
	bytes, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	content := string(bytes)
	lines := strings.Split(content, "\n")
	var numbers []int
	for _, line := range lines {
		var lineNumbers string
		for i := 0; i < len(line); i++ {
			number, ok := extractNumbers(line[i:])
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

	fmt.Println(sum)
}

func extractNumbers(line string) (string, bool) {
	re := regexp.MustCompile(`^\d`)
	switch {
	case re.MatchString(line):
		return line[0:1], true
	case strings.HasPrefix(line, "one") && extra:
		return "1", true
	case strings.HasPrefix(line, "two") && extra:
		return "2", true
	case strings.HasPrefix(line, "three") && extra:
		return "3", true
	case strings.HasPrefix(line, "four") && extra:
		return "4", true
	case strings.HasPrefix(line, "five") && extra:
		return "5", true
	case strings.HasPrefix(line, "six") && extra:
		return "6", true
	case strings.HasPrefix(line, "seven") && extra:
		return "7", true
	case strings.HasPrefix(line, "eight") && extra:
		return "8", true
	case strings.HasPrefix(line, "nine") && extra:
		return "9", true
	default:
		return "0", false
	}
}
