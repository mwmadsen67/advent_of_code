require 'set'

two_wires = []
File.readlines('test1.txt').each do |line|
  two_wires << line.strip.split(",")
end

def wire_crosser(wires)
  positions = Array.new(2) {Set.new}
  arr_pos = Array.new(2) {Array.new}
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
          arr_pos[i] << [x, y]
          positions[i] << [x, y]
        end
      when "U"
        while num > 0
          y += 1
          num -= 1
          arr_pos[i] << [x, y]
          positions[i] << [x, y]
        end
      when "L"
        while num > 0
          x -= 1
          num -= 1
          arr_pos[i] << [x, y]
          positions[i] << [x, y]
        end
      when "D"
        while num > 0
          y -= 1
          num -= 1
          arr_pos[i] << [x, y]
          positions[i] << [x, y]
        end
      end
    end
  end

  intersections1 = []
  intersections2 = []
  # steps1 = 0
  # steps2 = 0
  # arr_pos = [positions[0].to_a, positions[1].to_a]

  arr_pos[0].each_with_index do |int, i|
    # steps1 += 1
    if positions[1].include?(int)
      # intersections1 << [int, steps1]
      intersections1 << [int, i]
    end
  end

  arr_pos[1].each_with_index do |int, i|
    # steps2 += 1
    if positions[0].include?(int)
      # intersections2 << [int, steps2]
      intersections2 << [int, i]
    end
  end
  p "intersections1: #{intersections1} + intersections2: #{intersections2}"

  steppies = []

  intersections1.each do |inter1|
    intersections2.each do |inter2|
      if inter1[0] == inter2[0]
        steppies << inter1[1] + inter2[1] 
        p "inter1: #{inter1} inter2: #{inter2} steps: #{steppies.last}"
      end
    end
  end

  return steppies.min + 2

end

p wire_crosser(two_wires)