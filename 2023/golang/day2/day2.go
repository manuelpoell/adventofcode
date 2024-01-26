package day2

import (
	"strconv"
	"strings"
)

const MaxRed = 12
const MaxGreen = 13
const MaxBlue = 14

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

func Solve(input string, partTwo bool) int {
	c := newChallenge(input)

	if partTwo {
		return c.PartTwo()
	} else {
		return c.PartOne()
	}
}

func newChallenge(content string) *Challenge {
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
			c.games[i].sets[j].red = findCubeNumber(cubes, "red")
			c.games[i].sets[j].green = findCubeNumber(cubes, "green")
			c.games[i].sets[j].blue = findCubeNumber(cubes, "blue")
		}
	}
	return c
}

func (c Challenge) PartOne() int {
	var validGames []Game
	sum := 0
	for _, game := range c.games {
		if isValidGame(game) {
			validGames = append(validGames, game)
		}
	}

	for _, game := range validGames {
		sum += game.id
	}
	return sum
}

func (c Challenge) PartTwo() int {
	minSets := findMinSets(c.games)
	sum := 0
	for _, set := range minSets {
		product := set.red * set.green * set.blue
		sum += product
	}
	return sum
}

func findCubeNumber(cubes []string, color string) int {
	count := 0
	for _, cube := range cubes {
		cubeInfo := strings.Split(strings.TrimSpace(cube), " ")
		if strings.HasPrefix(cubeInfo[1], color) {
			count, _ = strconv.Atoi(cubeInfo[0])
		}
	}
	return count
}

func isValidGame(game Game) bool {
	isValid := true
	for _, set := range game.sets {
		if set.red > MaxRed || set.green > MaxGreen || set.blue > MaxBlue {
			isValid = false
			break
		}
	}
	return isValid
}

func findMinSets(games []Game) []Set {
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
