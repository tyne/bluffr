require 'session_generator'

describe SessionGenerator do
  describe :generate do
    it "should generate a unique 16 digit hex number" do
      value = described_class.generate
      value.length.should == 16
      value.should match /[0-9a-f]{16}/

      value.should_not == described_class.generate
    end
  end
end
