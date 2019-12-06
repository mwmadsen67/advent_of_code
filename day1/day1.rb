# require_relative 'puzzle_input.txt'

def find_fuel
  fuel = 0

  File.readlines('puzzle_input.txt').each do |line|
    new_fuel = (line.to_i / 3).floor - 2
    fuel += find_fuel_module(new_fuel)
  end

  return fuel
end

def find_fuel_module(n)
  new_fuel = (n / 3).floor - 2
  return n if new_fuel < 1
  n += find_fuel_module(new_fuel)
end

puts find_fuel