package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
)

const MaxRed = 12
const MaxGreen = 13
const MaxBlue = 14

var fileName string
var extra bool

type Set struct {
	red, green, blue int
}

type Game struct {
	id   int
	sets []Set
}

type Challenge struct {
	games []Game
}

func NewChallenge(content string) *Challenge {
	c := &Challenge{}
	lines := strings.Split(content, "\n")
	for i, line := range lines {
		game := strings.Split(line, ":")
		id, _ := strconv.Atoi(game[0][5:])
		c.games = append(c.games, Game{})
		c.games[i].id = id
		sets := strings.Split(game[1], ";")
		for j, set := range sets {
			cubes := strings.Split(set, ",")
			c.games[i].sets = append(c.games[i].sets, Set{})
			c.games[i].sets[j].red = FindCubeNumber(cubes, "red")
			c.games[i].sets[j].green = FindCubeNumber(cubes, "green")
			c.games[i].sets[j].blue = FindCubeNumber(cubes, "blue")
		}
	}
	return c
}

func (c Challenge) PartOne() int {
	var validGames []Game
	sum := 0
	for _, game := range c.games {
		if IsValidGame(game) {
			validGames = append(validGames, game)
		}
	}

	for _, game := range validGames {
		sum += game.id
	}
	return sum
}

func (c Challenge) PartTwo() int {
	minSets := FindMinSets(c.games)
	sum := 0
	for _, set := range minSets {
		product := set.red * set.green * set.blue
		sum += product
	}
	return sum
}

func FindCubeNumber(cubes []string, color string) int {
	count := 0
	for _, cube := range cubes {
		cubeInfo := strings.Split(strings.TrimSpace(cube), " ")
		if strings.HasPrefix(cubeInfo[1], color) {
			count, _ = strconv.Atoi(cubeInfo[0])
		}
	}
	return count
}

func IsValidGame(game Game) bool {
	isValid := true
	for _, set := range game.sets {
		if set.red > MaxRed || set.green > MaxGreen || set.blue > MaxBlue {
			isValid = false
			break
		}
	}
	return isValid
}

func FindMinSets(games []Game) []Set {
	var minSets []Set
	for _, game := range games {
		minSet := Set{0, 0, 0}
		for _, set := range game.sets {
			if set.red > minSet.red {
				minSet.red = set.red
			}
			if set.green > minSet.green {
				minSet.green = set.green
			}
			if set.blue > minSet.blue {
				minSet.blue = set.blue
			}
		}
		minSets = append(minSets, minSet)
	}
	return minSets
}

func init() {
	flag.StringVar(&fileName, "f", "../input.txt", "Path to input file")
	flag.BoolVar(&extra, "e", false, "Enable functions for part two")
	flag.Parse()
}

func main() {
	bytes, err := os.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	content := string(bytes)
	c := NewChallenge(content)

	if extra {
		fmt.Println(c.PartTwo())
	} else {
		fmt.Println(c.PartOne())
	}
}
