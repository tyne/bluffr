require 'securerandom'

class SessionGenerator
  def self.generate
    SecureRandom.hex(8)
  end
end
