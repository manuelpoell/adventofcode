import os
from day2.day2 import solvePart1, solvePart2

exampleFile = os.path.join(os.path.dirname(__file__), "example.txt")


def test_part1_solve():
    assert solvePart1(exampleFile) == 2


def test_part2_solve():
    assert solvePart2(exampleFile) == 4
