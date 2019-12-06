two_wires = []
File.readlines('test1.txt').each do |line|
  two_wires << line.strip.split(",")
end

def wire_crosser(wires)
  map = Array.new(20000) {Array.new(20000, nil)}
  pos = [10000, 10000]
  intersections = []

  wires.each do |wire|
    pos = [10000, 10000]
    wire.each_with_index do |piece, i|
      dir = piece[0]
      num = piece[1..-1].to_i
      x = pos[0]
      y = pos[1]
      case dir
      when "R"
        while num > 0
          y += 1
          num -= 1
          if map[x][y] == nil
            map[x][y] = i 
          elsif map[x][y] != i
            map[x][y] = "X"
            intersections << [x,y]
          end
        end
      when "U"
        while num > 0
          x += 1
          num -= 1
          if map[x][y] == nil
            map[x][y] = i 
          elsif map[x][y] != i
            map[x][y] = "X"
            intersections << [x,y]
          end
        end
      when "L"
        while num > 0
          y -= 1
          num -= 1
          if map[x][y] == nil
            map[x][y] = i 
          elsif map[x][y] != i
            map[x][y] = "X"
            intersections << [x,y]
          end
        end
      when "D"
        while num > 0
          x -= 1
          num -= 1
          if map[x][y] == nil
            map[x][y] = i 
          elsif map[x][y] != i
            map[x][y] = "X"
            intersections << [x,y]
          end
        end
      end
      pos = [x, y]
    end
  end

  distances = []

  intersections.each do |value|
    # p value
    val1, val2 = value[0], value[1]
    dist = (val1 - 10000).abs + (val2 - 10000).abs
    distances << dist
  end

  return distances.min
end


p wire_crosser(two_wires)