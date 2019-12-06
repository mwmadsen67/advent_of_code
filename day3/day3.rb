require 'set'

two_wires = []
File.readlines('puzzle_input.txt').each do |line|
  two_wires << line.strip.split(",")
end

def wire_crosser(wires)
  positions = Array.new(2) {Set.new}
  x = 0
  y = 0
  wire1, wires2 = wires[0], wires[1]

  wires.each_with_index do |wire, i|
    x = 0
    y = 0
    wire.each do |piece|
      dir = piece[0]
      num = piece[1..-1].to_i
      case dir
      when "R"
        while num > 0
          x += 1
          num -= 1
          positions[i] << [x, y]
        end
      when "U"
        while num > 0
          y += 1
          num -= 1
          positions[i] << [x, y]
        end
      when "L"
        while num > 0
          x -= 1
          num -= 1
          positions[i] << [x, y]
        end
      when "D"
        while num > 0
          y -= 1
          num -= 1
          positions[i] << [x, y]
        end
      end
    end
  end

  intersections = []
  positions[0].each do |int|
    intersections << int if positions[1].include?(int)
  end

  distances = []

  intersections.each do |value|
    # p value
    val1, val2 = value[0], value[1]
    dist = val1.abs + val2.abs
    distances << dist
  end
  p intersections
  
  return distances.min

end

p wire_crosser(two_wires)